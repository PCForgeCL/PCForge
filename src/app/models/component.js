'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Component.belongsTo(models.Brand, { foreignKey: 'brandName', targetKey: 'name' });
      Component.belongsTo(models.Category, { foreignKey: 'categoryName', targetKey: 'name' });
      Component.belongsTo(models.Shop, { foreignKey: 'shopName', targetKey: 'name' });
    }
  }
  Component.init({
    name: DataTypes.STRING,
    categoryName: DataTypes.STRING,
    brandName: DataTypes.STRING,
    shopName: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Component',
  });
  return Component;
};