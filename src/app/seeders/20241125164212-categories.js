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
    await queryInterface.bulkInsert('Categories', [
      { name: 'Motherboards', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Processors', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Memory', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Storage', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Graphics Cards', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Power Supplies', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cases', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cooling', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Peripherals', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Monitors', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
