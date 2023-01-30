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
        await queryInterface.bulkInsert('Users', [{
            id: 1,
            firstName: 'Herbie',
            lastName: 'Husker',
            email: 'herbie.husker@unl.edu',
            membershipId: 'ASDF56',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 2,
            firstName: 'Differ',
            lastName: 'Bagger',
            email: 'differ.bagger@unl.edu',
            membershipId: 'ASDF12',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 3,
            firstName: 'Node',
            lastName: 'Husker',
            email: 'node.husker@unl.edu',
            membershipId: 'ASDF34',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 4,
            firstName: 'Differ',
            lastName: 'Knowles',
            email: 'differ.knowles@unl.edu',
            membershipId: 'ASDF78',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            id: 5,
            firstName: 'Beck',
            lastName: 'Railer',
            email: 'beck.railer@unl.edu',
            membershipId: 'ASDF90',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};
