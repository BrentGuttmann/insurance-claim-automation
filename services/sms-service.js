const path = require('path');
const _FILENAME = path.basename(__filename);

const db = require('../models')

// TODO: Look at this code again to clean it up.
exports.processAfricaTalkingIncomingSMS = (req, res) => {
    const _FUNCTIONNAME = 'processAfricaTalkingUSSD'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    // Read the variables sent via POST from the API
    console.log('\nGot this message', req.body);

    // Send response back to the API
    res.sendStatus(200) // Important

}