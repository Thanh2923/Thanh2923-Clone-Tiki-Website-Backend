'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // Giả sử mỗi đơn hàng cần có userId
        references: {
          model: 'Users',  // Tên bảng Users
          key: 'id'        // Khóa chính của bảng Users
        },
        onDelete: 'CASCADE', // Tùy chọn: Xóa đơn hàng khi người dùng bị xóa
        onUpdate: 'CASCADE'
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),  // Thêm precision và scale cho kiểu DECIMAL
        allowNull: false // Giả sử mỗi đơn hàng cần có tổng giá trị
      },
      status: {
        type: Sequelize.ENUM('pending', 'shipped', 'completed', 'cancelled'), // Các giá trị cho status
        allowNull: false, // Giả sử mỗi đơn hàng cần có trạng thái
        defaultValue: 'pending' // Giá trị mặc định nếu không cung cấp
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      engine: 'InnoDB' // Use InnoDB engine to support foreign key constraints
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
