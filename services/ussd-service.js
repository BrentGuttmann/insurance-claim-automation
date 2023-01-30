const path = require('path');
const _FILENAME = path.basename(__filename);

const db = require('../models')

let _ussdSession = { // ideally use db, or redis-server

}

exports.processAfricaTalkingUSSD = async (req, res) => {
    const _FUNCTIONNAME = 'processAfricaTalkingUSSD'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    const membershipIdRegex = new RegExp(/[a-z]{4}\d{2}/gi)
    const membershipIdRegexAsk = new RegExp(/Membership\sID\:\s?(?<membershipId>[a-z]{4}\d{2})/gi)
    const locationRegexAsk = new RegExp(/Location\:\s?[\d\s\w\'\"\-]+/gi)
    const dateRegexAsk = new RegExp(/Date:\s?\d{2}\/\d{2}\/\d{4}/gi)
    const accidentTypeRegexAsk = new RegExp(/Accident\sType:\s?[\s\w]+/gi)
    const insuranceForRegexAsk = new RegExp(/For:\s?(?<name>[\s\w\'\"]+)/gi)

    console.log('\nGot this ussd', req.body);

    // Read the variables sent via POST from the API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to do?
        1. Raise a claim`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Provide your Membership ID`;
    } else if (membershipIdRegex.test(text)) {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END

        const _user = await db.User.findOne({ // authenticate with their membership id
            where: {
                membershipId: text.toUpperCase()
            }
        })
        if (_user === null) {
            response = `END Membership ID not found. Register or provide a valid membership id.`;
        } else {
            _ussdSession[sessionId] = { // save session details
                id: _user.id,
                firstName: _user.firstName,
                details: ''
            }

            response = `CON Hi ${_user.firstName}, provide insurance claim type in the format:
            For: e.g. Car Insurance`
        }

        
    } else if (sessionId in _ussdSession) {
        // collect details of their claim
        if (insuranceForRegexAsk.test(text)) {
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the Location of the incident with the format:
            Location: e.g. Nairobi CBD`
        } else if (locationRegexAsk.test(text)) {
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the date of the incident in the format:
            Date: e.g. DD/MM/YYYY`
        } else if (dateRegexAsk.test(text)) {
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the type of accident in the format:
            Accident Type: e.g. Collision`
        } else if (accidentTypeRegexAsk.test(text)) {
            response = `END Hi ${_ussdSession[sessionId].firstName}, thank you for providing these details. We've raised your claim.`
        } else { // TODO: Maybe give 2 trials here.
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the Location of the incident with the format:
            Location: e.g. Nairobi CBD`
        }

        // TODO: maybe split details into their own properties and check if they exist then ask accordingly
    } else {
        response = `CON Please provide a valid input`
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.status(200).send(response);

}

// TODO: Look at this code again to clean it up.
exports.processAfricaTalkingUSSDReport = (req, res) => {
    const _FUNCTIONNAME = 'processAfricaTalkingUSSDReport'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    // Read the variables sent via POST from the API
    console.log('\nUSSD Report', req.body);

    // Send response back to the API
    res.sendStatus(200) // Important
}