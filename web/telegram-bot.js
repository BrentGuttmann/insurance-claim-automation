const db = require('../models');
const TeleBot = require('telebot');

const bot = new TeleBot({
    token: process.env.TELEGRAM_BOT_TOKEN
})

// regex to for data validation and user inputs
const smsClaimRegex = new RegExp(/Membership\sID:\s?(?<membershipId>[a-z]{4}\d{2})\n?(?<details>For:\s?(?<name>[\s\w\'\"]+)\n?Location:\s?[\d\s\w\'\"\-]+\n?Date:\s?\d{2}\/\d{2}\/\d{4}\n?Accident\sType:\s?[\s\w]+)/gi);
const smsGreetingRegex = new RegExp(/h(i|ello)/gi)

const welcomeText = `Welcome! To make a claim please follow the format below.
                    
Membership ID: eg. X****4
For: e.g Car Insurance
Location: eg. Nairobi CBD
Date: DD/MM/YYYY
Accident Type: eg. Collision`
bot.on(['/start', '/hello'], (msg) => {
    return msg.reply.text(welcomeText)
}); // should say what the bot can do.

bot.on('text', async (msg) => {
    console.log('\ngot a Telegram text');
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

        console.log('looking for membershipId', matches.groups.membershipId);
        const _user = await db.User.findOne({ // authenticate with their membership id
            where: {
                membershipId: matches.groups.membershipId.toUpperCase()
            }
        })

        if (_user === null) {
            _message = 'Membership ID not found. Claim not raised.'
        } else { // save the details.
            const _claim = await db.Claim.create({ // name is optional, intended for 
                name: matches.groups.name,
                details: matches.groups.details,
                userId: _user.id
            })
            console.log('\ncreated claim', _claim);
            // For illustrative purposely, ideally, we'll expose a safe id.
            _message = `Thank you ${_user.firstName}. Your claim with id ${_claim.id} has been submitted. To attach images to your claim, send the image with caption (CLAIM ID: ${_claim.id}) To make another claim send "hi" or "hello"`
        }
    } else if (smsGreetingRegex.test(msg.text)) {
        _message = welcomeText
    }
    return msg.reply.text(_message)
});

// if they want to attach files to a claim, include the claim id in the caption.

bot.on('photo', async (msg) => { // what do we want to do on edit?, reprocess the message/command? or do nothing for now?
    // console.log('\nmsg', msg);

    if (msg.caption && (/CLAIM\sID:\s?(?<claimId>\d+)/gi).test(msg.caption)) {
        let claimIdRegex = /CLAIM\sID:\s?(?<claimId>\d+)/gi
        let _claimIdMatches = claimIdRegex.exec(msg.caption);
        console.log('\n_claimIdMatches', _claimIdMatches);

        const _claim = await db.Claim.findOne({ // authenticate with their membership id
            where: {
                id: _claimIdMatches.groups.claimId
            }
        })

        if (_claim === null) {
            return msg.reply.text('No claim with that id!', { asReply: true });
        } else {
            console.log('\nfound claim', _claim.id);
            msg.photo?.forEach((_photo) => {
                bot.getFile(_photo.file_id).then((res) => {
                    // console.log('res', res); // save res.fileLink
                    db.Media.create({
                        url: res.fileLink,
                        claimId: _claim.id
                    })
                })
            });
        }
    }

});

bot.on('edit', (msg) => { // what do we want to do on edit?, reprocess the message/command? or do nothing for now?
    return msg.reply.text('I saw it! You edited a message!', { asReply: true });
});

if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
    bot.start(); // only run in prod, there can only be one instance!
}