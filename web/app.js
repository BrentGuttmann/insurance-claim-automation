const telegramBot = require('./telegram-bot'); // kick off our telegram bot

const express = require('express');
const app = express();
const db = require('../models');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const session = require("express-session");
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const swaggerUi = require('swagger-ui-express')

let _store = new SequelizeStore({
  db: db.sequelize,
})

let _sessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: _store,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  // proxy: true, // if you do SSL outside of node.
  saveUninitialized: true,
  cookie: {
    path: '/'
  }
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  _sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(_sessionOptions));

_store.sync() // create the table for the Sessions if it doesn't exist

// set morgan to log info about our requests for development use.
const morganFormat = ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - response-time :response-time ms'
app.use(morgan(morganFormat)) // TODO: ignore /docs routes (it's unnecessarily clouding our logs)

app.use(helmet());
// use cors
app.use(cors())

const swaggerFile = require('../swagger-output.json')
// hot-fix
app.use(['/api/v1.0/docs', '/api/v1.0/doc','/docs?'], swaggerUi.serve, swaggerUi.setup(swaggerFile))

// TODO: auto import every controller
const ussdRoutes = require('../controllers/ussd-controller')
const smsRoutes = require('../controllers/sms-controller')

app.use('/api/v1.0', [ussdRoutes, smsRoutes])

app.use(function (req, res) {
    // TODO: check the url they navigated to that got them lost, and try to offer suggestions that'll match why they got lost... maybe they missed a letter in their statecode url
    res.set('Content-Type: text/plain');
    res.status(404).send('Hey, that URL/endpoint does not exist.') // show link to our docs?
});

module.exports = app;