Telegram Image Recognition Bot
This Telegram bot uses Node.js and Tesseract.js to recognize text in images. The bot downloads images sent in the chat, processes them to extract text, and sends the recognized text back to the user.

Features
Download images sent to the bot in Telegram.
Recognize text in images using Tesseract.js.
Send the recognized text back to the user.
Prerequisites
Node.js (version 14 or later)
Telegram Bot API token
Installation
Clone the repository:


git clone https://github.com/your-username/telegram-image-recognition-bot.git
cd telegram-image-recognition-bot
Install the required dependencies:


npm install
Create the images directory in the project root:


mkdir images
Replace 'YOUR_TELEGRAM_BOT_TOKEN' in bot.js with your actual Telegram Bot API token.

Usage
Run the bot:

Копировать код
node bot.js
Open your Telegram app and send an image to your bot.

The bot will download the image, recognize any text in it using Tesseract.js, and send the recognized text back to the chat.


Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
