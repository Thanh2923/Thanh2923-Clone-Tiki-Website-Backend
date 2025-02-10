'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders', // Bảng Orders
          key: 'id', // Khóa chính trong bảng Orders
        },
        onDelete: 'CASCADE', // Xóa dữ liệu khi đơn hàng bị xóa
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // Bảng Products
          key: 'id', // Khóa chính trong bảng Products
        },
        onDelete: 'CASCADE', // Xóa sản phẩm khi sản phẩm bị xóa
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      engine: 'InnoDB' // Use InnoDB engine to support foreign key constraints
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};
