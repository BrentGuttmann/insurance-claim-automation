'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        try {
            await queryInterface.bulkInsert('Claims', [{
                id: 1,
                name: 'Car Insurance',
                userId: 1,
                details: 'Should be more detailed text about the claim.',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 2,
                name: 'Car Insurance',
                userId: 2,
                details: 'Should be more detailed text about the claim.',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 3,
                name: 'Car Insurance',
                userId: 3,
                details: 'Should be more detailed text about the claim.',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
        } catch (error) {
            console.error("\nERR seeding claims up", error)
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        try {
            await queryInterface.bulkDelete('Claims', null, {});
        } catch (error) {
            console.error("\nERR seeding claims down", error)
        }
    }
};
