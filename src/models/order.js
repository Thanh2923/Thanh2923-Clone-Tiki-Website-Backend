'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mối quan hệ với bảng User
      Order.belongsTo(models.User, {  // Giả sử bạn có một model User
        foreignKey: 'userId',
        as: 'user', // Alias cho quan hệ
        onDelete: 'CASCADE', // Xóa đơn hàng khi người dùng bị xóa
        onUpdate: 'CASCADE'  // Cập nhật userId khi người dùng được cập nhật
      });
    }
  }
  Order.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'       
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(15, 2), 
      allowNull: false  
    },
    status: {
      type: DataTypes.ENUM('pending', 'shipped', 'completed', 'cancelled'), 
      allowNull: false, 
      defaultValue: 'pending' 
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
