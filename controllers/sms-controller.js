const express = require('express');
let router = express.Router();

const smsService = require('../services/sms-service')
const dataValidation = require('../middlewares/data-validation')
const sms = 'sms'

router.post(`/${sms}/africa-talking-incoming-sms`, express.urlencoded({extended: true}), smsService.processAfricaTalkingIncomingSMS)
router.post(`/${sms}/africa-talking-incoming-sms-delivery-report`, express.urlencoded({extended: true}), smsService.processAfricaTalkingIncomingSmsDeliveryReport)

module.exports = router;