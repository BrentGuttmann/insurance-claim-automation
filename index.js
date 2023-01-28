const dotenv = require('dotenv');
dotenv.config();

const TeleBot = require('telebot');

const bot = new TeleBot({
    token: process.env.TELEGRAM_BOT_TOKEN
})

bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!')); // should say what the bot can do.

bot.on('text', (msg) => msg.reply.text(msg.text));

bot.on('edit', (msg) => { // what do we want to do on edit?, reprocess the message/command? or do nothing for now?
    return msg.reply.text('I saw it! You edited a message!', { asReply: true });
});

bot.start();