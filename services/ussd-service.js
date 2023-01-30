const path = require('path');
const _FILENAME = path.basename(__filename);

const db = require('../models')

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

    try {
        if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*(?<insuranceFor>[1-8])\*(?<location>[\d\s\w\'\"\-]+)\*(?<date>\d{2}\/\d{2}\/\d{4})\*(?<accidentType>[\s\w]+)/gi).exec(text)) { // accidentTypeRegexAsk.test(text)
            console.log('\nhitting stepSix');
            const stepSixRegex = /1\*(?<membershipId>[a-z]{4}\d{2})\*(?<insuranceFor>[1-8])\*(?<location>[\d\s\w\'\"\-]+)\*(?<date>\d{2}\/\d{2}\/\d{4})\*(?<accidentType>[\s\w]+)/gi

            let _stepSixMatches = stepSixRegex.exec(text);

            const _user = await db.User.findOne({ // authenticate with their membership id
                where: {
                    membershipId: _stepSixMatches.groups.membershipId.toUpperCase()
                }
            })

            await db.Claim.create({
                name: _stepSixMatches.groups.insuranceFor,
                details: `For: ${_stepSixMatches.groups.insuranceFor}
                Location: ${_stepSixMatches.groups.location}
                Date: ${_stepSixMatches.groups.date}
                Accident Type: ${_stepSixMatches.groups.accidentType}`,
                userId: _user.id
            })

            response = `END Hi ${_user.firstName}, thank you for providing these details. We've raised your claim.`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]\*(?<location>[\d\s\w\'\"\-]+)\*(?<date>\d{2}\/\d{2}\/\d{4})/gi).exec(text)) { // dateRegexAsk.test(text)
            console.log('\nhitting stepFive');
            // TODO: check that data is an actual date.
            const stepFiveRegex = /1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]\*(?<location>[\d\s\w\'\"\-]+)\*(?<date>\d{2}\/\d{2}\/\d{4})/gi

            let _stepFiveMatches = stepFiveRegex.exec(text);

            const _user = await db.User.findOne({ // authenticate with their membership id
                where: {
                    membershipId: _stepFiveMatches.groups.membershipId.toUpperCase()
                }
            })

            response = `CON Hi ${_user.firstName}, provide the type of accident/incident:
                e.g. Collision`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]\*(?<location>[\d\s\w\'\"\-]+)/gi).exec(text)) { // locationRegexAsk.test(text)
            console.log('\nhitting stepFour');
            const stepFourRegex = /1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]\*(?<location>[\d\s\w\'\"\-]+)/gi

            let _stepFourMatches = stepFourRegex.exec(text);

            const _user = await db.User.findOne({ // authenticate with their membership id
                where: {
                    membershipId: _stepFourMatches.groups.membershipId.toUpperCase()
                }
            })

            response = `CON Hi ${_user.firstName}, provide the date of the incident:
                e.g. DD/MM/YYYY`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]/gi).exec(text)) { // insuranceForRegexAsk.test(text)
            console.log('\nhitting stepThree');
            const stepThreeRegex = /1\*(?<membershipId>[a-z]{4}\d{2})\*[1-8]/gi

            let _stepThreeMatches = stepThreeRegex.exec(text);

            const _user = await db.User.findOne({ // authenticate with their membership id
                where: {
                    membershipId: _stepThreeMatches.groups.membershipId.toUpperCase()
                }
            })

            response = `CON Hi ${_user.firstName}, provide the Location of the incident:
                e.g. Nairobi CBD`
        } else if ((/1\*(?<membershipId>[a-z]{4}\d{2})/gi).exec(text)) {
            console.log('\nhitting stepTwo');
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

        } else if (text == '1') {
            console.log('\nhitting stepOne');
            // Business logic for first level response
            response = `CON Provide your Membership ID`;
        } else if (text == '') {
            console.log('\nhitting stepZero');
            // This is the first request. Note how we start the response with CON
            response = `CON What would you like to do?
            1. Raise a claim`;
            // Maybe include an option (2. Get all raised claims)
        } else {
            console.log('\nhitting error input');
            response = `END Please provide a valid input. Try again.`
        }

        // Send the response back to the API
        res.set('Content-Type: text/plain');
        res.status(200).send(response);
    } catch (error) {
        response = 'END Service Error. Please try again later.'
        // Send the response back to the API
        res.set('Content-Type: text/plain');
        res.status(200).send(response);
    }

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