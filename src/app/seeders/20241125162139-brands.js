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
    await queryInterface.bulkInsert('Brands', [
      { name: 'Nvidia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intel', createdAt: new Date(), updatedAt: new Date() },
      { name: 'AMD', createdAt: new Date(), updatedAt: new Date() },
      { name: 'HP', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Asus', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
