const path = require('path');
const _FILENAME = path.basename(__filename);

const db = require('../models')

exports.getAllUsers = (req, res) => {
    const _FUNCTIONNAME = 'getAllUsers'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    db.User.findAll()
    .then(results => {
        res.status(200).json({
            message: 'Hello',
            data: results
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occured.',
            error: err
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not fetch all users. An error occured',
            error
        })
    })

}

exports.getAllUsersWithClaims = (req, res) => {
    const _FUNCTIONNAME = 'getAllUsers'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    db.User.findAll()
    .then(results => {
        res.status(200).json({
            message: 'Hello',
            data: results
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occured.',
            error: err
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not fetch all users. An error occured',
            error
        })
    })

}

exports.createNewUser = (req, res) => {
    const _FUNCTIONNAME = 'createNewUser'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    db.User.create({ // shorten to {...req.body} ?
        membershipId: req.body.membershipId, // Ideally auto generate membershipId
        email: req.body.email,
        lastName: req.session.lastName,
        firstName: req.session.firstName
    }).then((result) => {
        res.status(200).json({
            message: 'Hello',
            data: result
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occured.',
            errors: err.errors || err.original
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not create user. An error occured'
        })
    })

}

// TODO: work on this
exports.createNewClaimForUser = (req, res) => {
    const _FUNCTIONNAME = 'createNewClaimForUser'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    db.User.create({
        membershipId: req.body.membershipId, // Ideally auto generate membershipId
        email: req.body.email,
        lastName: req.session.lastName,
        firstName: req.session.firstName
    }).then((result) => {
        res.status(200).json({
            message: 'Hello',
            data: result
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occured.',
            errors: err.errors || err.original
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not create user. An error occured'
        })
    })

}

// TODO: work on this
exports.getSingleUser = (req, res) => {
    const _FUNCTIONNAME = 'getSingleUser'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    db.User.findOne({
        membershipId: req.body.membershipId, // Ideally auto generate membershipId
    }).then((result) => {
        res.status(200).json({
            message: 'Hello',
            data: result
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occured.',
            errors: err.errors || err.original
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not create user. An error occured'
        })
    })

}

// TODO: work on this
exports.getSingleUserWithClaims = (req, res) => {
    const _FUNCTIONNAME = 'getSingleUser'
    console.log('\nhitting', _FILENAME, _FUNCTIONNAME);

    db.User.findOne({
        membershipId: req.body.membershipId, // Ideally auto generate membershipId
    }).then((result) => {
        res.status(200).json({
            message: 'Hello',
            data: result
        })
    }, (err) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, err)
        res.status(501).json({
            message: 'Hello. An Error Occured.',
            errors: err.errors || err.original
        })
    }).catch((error) => {
        console.error(`ERR in ${_FILENAME} ${_FUNCTIONNAME}:`, error)
        res.status(501).json({
            message: 'We could not create user. An error occured'
        })
    })

}
