'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const brands = [
      'Asus', 'MSI', 'Gigabyte', 'EVGA', 'Zotac', 'Sapphire', 'PowerColor', 'PNY',
      'Corsair', 'Cooler Master', 'Noctua', 'Western Digital', 'Seagate', 'Crucial',
      'ADATA', 'Kingston', 'Samsung', 'Intel', 'AMD', 'Nvidia', 'Thermaltake',
      'Be Quiet!', 'Lian Li', 'Fractal Design', 'NZXT', 'ASRock', 'HyperX', 'Razer',
      'Logitech', 'SteelSeries', 'Dell', 'TP-Link', 'Acer', 'Sony'
    ];

    const timestamp = new Date();
    const brandRecords = brands.map(name => ({
      name,
      createdAt: timestamp,
      updatedAt: timestamp
    }));

    await queryInterface.bulkInsert('Brands', brandRecords, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
