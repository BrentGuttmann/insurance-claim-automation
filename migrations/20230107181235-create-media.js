'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Media', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        url: {
          type: Sequelize.STRING,
        },
        claimId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Claims',
            },
            key: 'id'
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    } catch (error) {
      console.error("\nERR migrating media up", error)
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('Media');
    } catch (error) {
      console.error("\nERR migrating media down", error)
    }
  }
};