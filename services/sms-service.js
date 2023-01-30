const path = require('path');
const _FILENAME = path.basename(__filename);

// Initialize Africa's Talking SDK
const AfricasTalking = require('africastalking');
const db = require('../models')

const africastalking = AfricasTalking({
    apiKey: process.env.AT_SANDBOX_API_KEY,
    username: process.env.AT_SANDBOX_USERNAME
});

// regex to for data validation and user inputs
const smsClaimRegex = new RegExp(/Membership\sID:\s?(?<membershipId>[a-z]{4}\d{2})\n?(?<details>For:(?<name>[\s\w\'\"]+)\n?Location:[\d\s\w\'\"\-]+\n?Date:\s?\d{2}\/\d{2}\/\d{4}\n?Accident\sType:[\s\w]+)/gi);
const smsGreetingRegex = new RegExp(/h(i|ello)/gi)
const membershipIdRegex = new RegExp(/[a-z]{4}\d{2}/gi)
// TODO: Look at this code again to clean it up.
exports.processAfricaTalkingIncomingSMS = async (req, res) => {
    const _FUNCTIONNAME = 'processAfricaTalkingUSSD'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    // Read the variables sent via POST from the API
    console.log('\nGot this sms message', req.body);
    console.log('\n\nthe text', req.body.text);

    let _message = 'Welcome to Incourage Insurance Claim Service. To get started, send "hi" or "hello"'

    try {
        if (smsGreetingRegex.test(req.body.text)) { // if they sent "hi" or "hello"
            _message = `Welcome! To make a claim please follow the format below.
                    
                    Membership ID: eg. X****4
                    For: e.g Car Insurance
                    Location: eg. Nairobi CBD
                    Date: DD/MM/YYYY
                    Accident Type: eg. Collision`
        } else if (smsClaimRegex.exec(req.body.text)) { // they've followed the specified. smsClaimRegex.test(req.body.text)
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

            let matches = smsClaimRegex.exec(req.body.text);

            const _user = await db.User.findOne({ // authenticate with their membership id
                where: {
                    membershipId: matches.groups.membershipId.toUpperCase()
                }
            })

            if (_user === null) {
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

        // TODO: checks for when they don't follow the format.

        const result = await africastalking.SMS.send({
            to: req.body.from,
            message: _message,
            from: req.body.to
        });
        console.log(result);
    } catch (err) {
        console.error(err);
    }

    // Send response back to the API
    res.sendStatus(200) // Important for AT!

}

// TODO: Look at this code again to clean it up.
exports.processAfricaTalkingIncomingSmsDeliveryReport = (req, res) => {
    const _FUNCTIONNAME = 'processAfricaTalkingIncomingSmsDeliveryReport'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    // Read the variables sent via POST from the API
    console.log('\nSMS Report', req.body);

    // Send response back to the API
    res.sendStatus(200) // Important for AT!
}