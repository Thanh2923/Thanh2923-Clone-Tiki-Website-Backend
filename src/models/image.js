'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mối quan hệ với bảng Products
      Image.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product', 
        onDelete: 'SET NULL', 
        onUpdate: 'CASCADE' 
      });
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,  // url không thể null
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // productId không thể null
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
