'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Shops', [
      {
        name: 'Amazon',
        location: 'https://www.amazon.com',
        email: '',
        phone: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Newegg',
        location: 'https://www.newegg.com',
        email: '',
        phone: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Best Buy',
        location: 'https://www.bestbuy.com',
        email: '',
        phone: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Shops', null, {});
  }
};
