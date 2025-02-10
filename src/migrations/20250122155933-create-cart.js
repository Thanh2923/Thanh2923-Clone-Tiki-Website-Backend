'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Liên kết với bảng Users
          key: 'id'        // Khóa chính của bảng Users
        },
        onDelete: 'CASCADE',  // Nếu người dùng bị xóa, các cart của họ cũng bị xóa
        onUpdate: 'CASCADE'   // Nếu người dùng được cập nhật, cập nhật cart
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',  // Liên kết với bảng Products
          key: 'id'           // Khóa chính của bảng Products
        },
        onDelete: 'CASCADE',  // Nếu sản phẩm bị xóa, các cart liên quan cũng bị xóa
        onUpdate: 'CASCADE'   // Nếu sản phẩm được cập nhật, cập nhật cart
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};
