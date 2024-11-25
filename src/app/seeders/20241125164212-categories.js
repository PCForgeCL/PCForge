'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      'Graphics Cards',
      'Motherboards',
      'Memory',
      'Processors',
      'Storage',
      'Power Supplies',
      'Cooling',
      'Cases',
      'Monitors',
      'Keyboard',
      'Mouse',
      'Headset',
      'External Storage',
      'Network Adapter',
      'Optical Drive',
      'Fan Controller',
      'Cable Management',
      'Operating System',
      'Gaming Chair',
      'Desk',
      'UPS (Uninterruptible Power Supply)',
      'VR Headset',
      'Sound Card',
      'Capture Card',
      'Laptops',
      'Tablet',
      'Smartphone',
      'Docking Station',
      'Printer',
      'Scanner',
      'Peripherals',
      'Networking'
    ];

    const categoriesData = categories.map((name) => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Categories', categoriesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
