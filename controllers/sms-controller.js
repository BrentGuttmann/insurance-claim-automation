const express = require('express');
let router = express.Router();

const smsService = require('../services/sms-service')
const dataValidation = require('../middlewares/data-validation')
const sms = 'sms'

router.post(`/${sms}/africa-talking-incoming-sms`, express.json(), smsService.processAfricaTalkingIncomingSMS)

module.exports = router;