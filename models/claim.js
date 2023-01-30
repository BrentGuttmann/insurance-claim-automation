'use strict';
const {
  Model
} = require('sequelize');
const { formatDistance, formatRelative, subDays } = require('date-fns');

module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Claim.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
      })
    }
  }
  Claim.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Claim',
  });
  Claim.sync({alter: true}) // Mini TODO: only do this in "development" env. There's a way to do this all at once in app.js.
  return Claim;
};

/**
 * TODOs
 * There should be a composite unique key for task name, and time of task, to prevent duplicates
 */