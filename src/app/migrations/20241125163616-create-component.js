'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Components', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryName: {
        type: Sequelize.STRING,
        references: {
          model: 'Categories',
          key: 'name'
        }
      },
      brandName: {
        type: Sequelize.STRING,
        references: {
          model: 'Brands',
          key: 'name'
        }
      },
      shopName: {
        type: Sequelize.STRING,
        references: {
          model: 'Shops',
          key: 'name'
        }
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Components');
  }
};