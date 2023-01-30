const db = require('../models');
const TeleBot = require('telebot');

const bot = new TeleBot({
    token: process.env.TELEGRAM_BOT_TOKEN
})

// regex to for data validation and user inputs
const smsClaimRegex = new RegExp(/Membership\sID:\s?(?<membershipId>[a-z]{4}\d{2})\n?(?<details>For:(?<name>[\s\w\'\"]+)\n?Location:[\d\s\w\'\"\-]+\n?Date:\s?\d{2}\/\d{2}\/\d{4}\n?Accident\sType:[\s\w]+)/gi);
const smsGreetingRegex = new RegExp(/h(i|ello)/gi)

bot.on(['/start', '/hello'], (msg) => {
    return msg.reply.text(`Welcome! To make a claim please follow the format below.
                    
    Membership ID: eg. X****4
    For: e.g Car Insurance
    Location: eg. Nairobi CBD
    Date: DD/MM/YYYY
    Accident Type: eg. Collision`)
}); // should say what the bot can do.

bot.on('text', async (msg) => {
    let matches = smsClaimRegex.exec(msg.text);
    let _message = ''
    if (matches) { // they've followed the specified. smsClaimRegex.test(msg.text)
        /**
         * next steps:
         * we'll confirm their membership id. if it's okay
         * we'll save the details they provided: location, date, and accident type in the format below
         * `Location: eg. Nairobi CBD
         * Date: DD/MM/YYYY
         * Accident Type: eg. Collision`
         * 
         * else we tell them invalid id.
         */


        const _user = await db.User.findOne({ // authenticate with their membership id
            where: {
                membershipId: matches.groups.membershipId.toUpperCase()
            }
        })

        if (_user === null) {
            req.session.authenticated = false
            _message = 'Membership ID not found.'
        } else { // save the details.
            const _claim = await db.Claim.create({ // name is optional, intended for 
                name: matches.groups.name,
                details: matches.groups.details,
                userId: _user.id
            })
            console.log('\ncreated claim', _claim);
            _message = `Thank you ${_user.firstName}. Your claim has been submitted. To make another claim send "hi" or "hello"`
        }
    }
    return msg.reply.text(_message)
});

bot.on('edit', (msg) => { // what do we want to do on edit?, reprocess the message/command? or do nothing for now?
    return msg.reply.text('I saw it! You edited a message!', { asReply: true });
});

if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    bot.start(); // only run in prod, there can only be one instance!
}