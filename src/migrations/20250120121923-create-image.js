'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,  // url không thể null
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,  // productId không thể null
        references: {
          model: 'Products',  // Liên kết với bảng Products
          key: 'id'           // Khóa chính của bảng Products
        },
        onDelete: 'CASCADE'  // Nếu sản phẩm bị xóa, các hình ảnh liên quan cũng bị xóa
      },
      flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable('Images');
  }
};
