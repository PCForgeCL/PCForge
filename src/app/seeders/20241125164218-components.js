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
    await queryInterface.bulkInsert('Components', [
      {
        name: 'RTX 3090',
        categoryName: 'Graphics Cards',
        brandName: 'Nvidia',
        shopName: 'Amazon',
        description: 'The Nvidia RTX 3090 is the most powerful consumer graphics card in the world',
        price: 1499.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'RTX 3090',
        categoryName: 'Graphics Cards',
        brandName: 'Nvidia',
        shopName: 'Newegg',
        description: 'The Nvidia RTX 3090 is the most powerful consumer graphics card in the world!! Buy it here!',
        price: 1600.99,
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
    await queryInterface.bulkDelete('Components', null, {});
  }
};
