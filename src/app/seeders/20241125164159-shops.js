'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const shops = [
      { name: 'Amazon', location: 'https://www.amazon.com', email: '', phone: '' },
      { name: 'Newegg', location: 'https://www.newegg.com', email: '', phone: '' },
      { name: 'Best Buy', location: 'https://www.bestbuy.com', email: '', phone: '' },
      { name: 'Micro Center', location: 'https://www.microcenter.com', email: '', phone: '' },
      { name: 'B&H Photo Video', location: 'https://www.bhphotovideo.com', email: '', phone: '' },
      { name: 'TigerDirect', location: 'https://www.tigerdirect.com', email: '', phone: '' },
      { name: 'Walmart', location: 'https://www.walmart.com', email: '', phone: '' },
      { name: 'Target', location: 'https://www.target.com', email: '', phone: '' },
      { name: 'PC Part Picker', location: 'https://www.pcpartpicker.com', email: '', phone: '' },
      { name: 'AliExpress', location: 'https://www.aliexpress.com', email: '', phone: '' },
      { name: 'Overclockers UK', location: 'https://www.overclockers.co.uk', email: '', phone: '' },
      { name: 'Scan Computers', location: 'https://www.scan.co.uk', email: '', phone: '' },
      { name: 'CoolBlue', location: 'https://www.coolblue.nl', email: '', phone: '' },
      { name: 'Flipkart', location: 'https://www.flipkart.com', email: '', phone: '' },
      { name: 'eBuyer', location: 'https://www.ebuyer.com', email: '', phone: '' },
      { name: 'Adorama', location: 'https://www.adorama.com', email: '', phone: '' },
      { name: 'Rakuten', location: 'https://www.rakuten.com', email: '', phone: '' },
    ];

    const shopData = shops.map((shop) => ({
      ...shop,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Shops', shopData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shops', null, {});
  }
};
