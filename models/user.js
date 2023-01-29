'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');

/**
 * TODO contribution in OSS.
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }

  /**
   * TODO:
   * 1. Maybe check if there's a space/spaces between names provided by google and return first/last names accordingly
   */
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`; // this.firstName is how you access columns without actual values
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, {}) {
      },
      afterCreate(user, {}) {
      }
    }
  });
  User.sync({alter: true})
  return User;
};