const express = require('express');
let router = express.Router();

const ussdService = require('../services/ussd-service')
const dataValidation = require('../middlewares/data-validation')
const ussd = 'ussd'

router.post(`/${ussd}/africa-talking-ussd-webhook`, express.json(), dataValidation.africaTalkingUssdCallback, ussdService.processAfricaTalkingUSSD)

module.exports = router;