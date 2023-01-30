'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        membershipId: {
          type: Sequelize.STRING,
          unique: true,
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
      console.error("\nERR migrating users up", error)
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('Users');
    } catch (error) {
      console.error("\nERR migrating users down", error)
    }
  }
};