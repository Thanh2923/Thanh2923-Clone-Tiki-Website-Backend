'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
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
          key: 'id'        // Khóa chính trong bảng Orders
        },
        onDelete: 'CASCADE', // Nếu đơn hàng bị xóa thì các payment liên quan cũng sẽ bị xóa
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Bảng Users
          key: 'id'       // Khóa chính trong bảng Users
        },
        onDelete: 'CASCADE', // Nếu người dùng bị xóa thì các payment liên quan cũng sẽ bị xóa
      },
      paymentMethod: {
        type: Sequelize.ENUM('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'),
        allowNull: false,  // paymentMethod không thể null
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        allowNull: false,  // status không thể null
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: true,  // transactionId có thể null
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
    await queryInterface.dropTable('Payments');
  }
};
