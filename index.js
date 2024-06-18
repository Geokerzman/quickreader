const TelegramBot = require('node-telegram-bot-api');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const token = 'YOUR_TOKEN'

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    if (msg.photo) {
        const photoId = msg.photo[msg.photo.length - 1].file_id;
        bot.getFileLink(photoId).then(fileLink => {
            console.log(`File link: ${fileLink}`);
            const filePath = path.join(__dirname, 'images', `${photoId}.jpg`);
            console.log(`Saving to: ${filePath}`);
            downloadImage(fileLink, filePath, () => {
                console.log(`Saved file to: ${filePath}`);
                Tesseract.recognize(
                    filePath,
                    'eng',
                    {
                        logger: m => console.log(m)
                    }
                ).then(({ data: { text } }) => {
                    bot.sendMessage(msg.chat.id, `Распознанный текст: ${text}`);
                    fs.unlinkSync(filePath); // удаляем файл после обработки
                }).catch(err => {
                    console.error(`Ошибка при распознавании: ${err.message}`);
                });
            });
        }).catch(err => {
            console.error(`Ошибка при получении ссылки на файл: ${err.message}`);
        });
    }
});

const downloadImage = (url, filePath, callback) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(callback);
        });
    }).on('error', (err) => {
        fs.unlinkSync(filePath); // удаляем файл в случае ошибки
        console.error(`Ошибка при загрузке изображения: ${err.message}`);
    });
};
