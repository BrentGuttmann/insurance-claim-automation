const fs = require('fs');
const dotenv = require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    dialect: process.env.DEV_DB_DIALECT,
    storage: process.env.DEV_DB_URL,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    dialect: process.env.PROD_DB_DIALECT,
    storage: process.env.PROD_DB_URL,
    dialectOptions: {
      bigNumberStrings: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  },
};