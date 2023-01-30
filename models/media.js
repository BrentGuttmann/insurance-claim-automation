'use strict';
const {
    Model
} = require('sequelize');
const { formatDistance, formatRelative, subDays } = require('date-fns'); // import { formatDistance, formatRelative, subDays } from 'date-fns';

module.exports = (sequelize, DataTypes) => {
    class Media extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Media.belongsTo(models.Claim, {
                foreignKey: {
                    name: 'claimId',
                    allowNull: false
                }
            })

        }
    }
    Media.init({
        id: {
            allowNull: false,
            autoIncrement: true, // Or DataTypes.UUIDV1,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true, // should be urls
            }
        },
        claimId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        modelName: 'Media',
    });
    Media.sync({alter: true})
    return Media;
};