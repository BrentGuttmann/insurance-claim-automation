const path = require('path');
const _FILENAME = path.basename(__filename);

// Initialize Africa's Talking SDK
const AfricasTalking = require('africastalking');
const db = require('../models')

const africastalking = AfricasTalking({
    apiKey: process.env.AT_SANDBOX_API_KEY,
    username: process.env.AT_SANDBOX_USERNAME
});

// TODO: Look at this code again to clean it up.
exports.processAfricaTalkingIncomingSMS = async (req, res) => {
    const _FUNCTIONNAME = 'processAfricaTalkingUSSD'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    // Read the variables sent via POST from the API
    console.log('\nGot this sms message', req.body);

    try {
        const result = await africastalking.SMS.send({
            to: req.body.from,
            message: 'Hey AT Ninja! Wassup...',
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