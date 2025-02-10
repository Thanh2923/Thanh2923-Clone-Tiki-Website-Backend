'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // Quan hệ một nhiều với Category
      Brand.belongsTo(models.Category, {
        foreignKey: 'categoryId',  
        as: 'category',  
        onDelete: 'SET NULL',  
      });
    }
  }
  
  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    categoryId: {  // Thêm cột categoryId
      type: DataTypes.INTEGER,
      allowNull: true,  // Cho phép null vì không phải mọi thương hiệu đều có thể thuộc một category
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  
  return Brand;
};
