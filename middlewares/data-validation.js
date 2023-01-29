const path = require('path');
const _FILENAME = path.basename(__filename);

const Joi = require('joi');

module.exports.africaTalkingUssdCallback = (req, res, next) => {
    const _FUNCTIONNAME = 'africaTalkingUssdCallback'
    console.log('hitting', _FILENAME, _FUNCTIONNAME);

    // TODO: Make the data check better, more stringent
    const africaTalkingUssdCallbackSchema = Joi.object({
        sessionId: Joi.any(),
        serviceCode: Joi.any(),
        networkCode: Joi.any(),
        phoneNumber: Joi.any(),
        text: Joi.any().allow('')
    })

    const { error, value } = africaTalkingUssdCallbackSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: 'There is an issue with the data you provided',
            error
        })
    } else {
        next()
    }
}