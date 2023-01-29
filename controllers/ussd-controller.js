const express = require('express');
let router = express.Router();

const ussdService = require('../services/ussd-service')
const dataValidation = require('../middlewares/data-validation')
const ussd = 'ussd'

router.post(`/${ussd}/africa-talking-ussd-webhook`, express.urlencoded({extended: true}), /* dataValidation.africaTalkingUssdCallback, */ ussdService.processAfricaTalkingUSSD)
router.post(`/${ussd}/africa-talking-ussd-event-report`, express.urlencoded({extended: true}), /* dataValidation.africaTalkingUssdCallback, */ ussdService.processAfricaTalkingUSSDReport)

module.exports = router;