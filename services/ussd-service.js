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
    } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})/gi).test(text)) {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END

        const stepTwoRegex = /1\*(?<membershipId>[a-z]{4}\d{2})/gi

        let _stepTwoMatches = stepTwoRegex.exec(text);

        const _user = await db.User.findOne({ // authenticate with their membership id
            where: {
                membershipId: _stepTwoMatches.groups.membershipId.toUpperCase()
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

            response = `CON Hi ${_user.firstName}, select insurance claim type:
            1. Car Insurance.
            2. Comprehensive Car Insurance.
            3. Own Damage Car Insurance.
            4. Third Party Car Insurance.
            5. Two Wheeler Insurance.
            6. Comprehensive Two Wheeler Insurance.
            7. Own Damage Two Wheeler Insurance.
            8. Commercial Vehicle Insurance.`
        }

        
    } else if (sessionId in _ussdSession) {
        // collect details of their claim
        if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]/gi).test(text)) { // insuranceForRegexAsk.test(text)
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the Location of the incident:
            e.g. Nairobi CBD`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8](?<location>[\d\s\w\'\"\-]+)/gi).test(text)) { // locationRegexAsk.test(text)
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the date of the incident:
            e.g. DD/MM/YYYY`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8](?<location>[\d\s\w\'\"\-]+)\*(?<date>\d{2}\/\d{2}\/\d{4})/gi).test(text)) { // dateRegexAsk.test(text)
            response = `CON Hi ${_ussdSession[sessionId].firstName}, provide the type of accident/incident:
            e.g. Collision`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*(?<insuranceFor>[1-8])(?<location>[\d\s\w\'\"\-]+)\*(?<date>\d{2}\/\d{2}\/\d{4})\*(?<accidentType>[\s\w]+)/gi).test(text)) { // accidentTypeRegexAsk.test(text)
            response = `END Hi ${_ussdSession[sessionId].firstName}, thank you for providing these details. We've raised your claim.`
        } else { // TODO: Maybe give 2 trials here.
            response = `CON Hi ${_ussdSession[sessionId].firstName}, select insurance claim type:
            1. Car Insurance.
            2. Comprehensive Car Insurance.
            3. Own Damage Car Insurance.
            4. Third Party Car Insurance.
            5. Two Wheeler Insurance.
            6. Comprehensive Two Wheeler Insurance.
            7. Own Damage Two Wheeler Insurance.
            8. Commercial Vehicle Insurance.`
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