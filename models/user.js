'use strict';
const {
  Model
} = require('sequelize');
const { formatDistance, formatRelative, subDays } = require('date-fns');

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
      User.hasMany(models.Claim, {
        foreignKey: 'userId',
        allowNull: false
      })
    }
  }

  /**
   * TODO:
   * 1. Maybe check if there's a space/spaces between names provided by google and return first/last names accordingly
   */
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    membershipId: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
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