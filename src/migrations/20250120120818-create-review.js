'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // userId không thể null
        references: {
          model: 'Users',  // Liên kết với bảng Users
          key: 'id'        // Khóa chính của bảng Users
        },
        onDelete: 'CASCADE'  // Nếu người dùng bị xóa, các review liên quan cũng bị xóa
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // productId không thể null
        references: {
          model: 'Products',  // Liên kết với bảng Products
          key: 'id'           // Khóa chính của bảng Products
        },
        onDelete: 'CASCADE'  // Nếu sản phẩm bị xóa, các review liên quan cũng bị xóa
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,  // rating không thể null
        validate: {
          min: 1,  // Rating phải từ 1 đến 5
          max: 5
        }
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,  // comment có thể null
      },
      flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('Reviews');
  }
};
