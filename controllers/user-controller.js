// For brevity, I'll include other endpoints here, since they're all related to users.
const express = require('express');
let router = express.Router();

const userService = require('../services/user-service')
const dataValidation = require('../middlewares/data-validation')
const user = 'user'

router.get(`/${user}/all`, userService.getAllUsers)
router.get(`/${user}/all/claims`, userService.getAllUsersWithClaims)

router.post(`/${user}/new-user`, express.json(), userService.createNewUser)

router.get(`/${user}/:id`, express.json(), userService.getSingleUser)
router.get(`/${user}/:id/claims`, express.json(), userService.getSingleUserWithClaims)

router.post(`/${user}/claim`, express.json(), userService.createNewClaimForUser)

module.exports = router;