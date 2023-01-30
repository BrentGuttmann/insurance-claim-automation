'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Claims', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        completed: {
          type: Sequelize.BOOLEAN,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'id'
          },
        },
        details: {
          type: Sequelize.TEXT,
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
      console.error("\nERR migrating claims up", error)
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('Claims');
    } catch (error) {
      console.error("\nERR migrating claims down", error)
    }
  }
};