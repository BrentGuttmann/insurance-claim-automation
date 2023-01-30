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
            await queryInterface.bulkInsert('Media', [{
                id: 1,
                name: 'Randon name 001',
                claimId: 1,
                url: 'https://picsum.photos/200',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 2,
                name: 'Yesterday Sunlight',
                claimId: 2,
                url: 'https://picsum.photos/200',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 3,
                name: 'Noon day at Wednesday',
                url: 'https://picsum.photos/200',
                claimId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
        } catch (error) {
            console.error("\nERR seeding media up", error)
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
            await queryInterface.bulkDelete('Media', null, {});
        } catch (error) {
            console.error("\nERR seeding media down", error)
        }
    }
};
