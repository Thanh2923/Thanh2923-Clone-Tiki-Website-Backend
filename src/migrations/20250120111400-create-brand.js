'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      categoryId: {  // Thêm cột categoryId
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',  // Tên bảng danh mục (category)
          key: 'id',  // Khóa chính của bảng Categories
        },
        onDelete: 'SET NULL',  // Hành động khi xóa một Category, thiết lập null
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
    await queryInterface.dropTable('Brands');
  }
};
