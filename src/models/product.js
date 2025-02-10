'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with the Category model
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE' 
      });

      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId',
        as: 'brand',
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE' 
      });
      Product.hasMany(models.Image, {
        foreignKey: 'productId',
        as: 'images', 
        onDelete: 'CASCADE', 
      });
    
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false // Assuming product names should not be null
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Define precision and scale for decimal values
      allowNull: false
    },
    sale: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // Default value for sale field
    },
    priceSale: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // Default value for stock field
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false // Assuming category is optional
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,  
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
