'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mối quan hệ với bảng Orders
      Payment.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE' 
      });

      // Mối quan hệ với bảng Users
      Payment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'  
      });
    }
  }
  Payment.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'),
      allowNull: false,  
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,  
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,  
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
