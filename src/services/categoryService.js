
const { Category } = require('../models');
const categoryService = {
    // Lấy tất cả danh mục
    getAllCategories: async () => {
      try {
        const categories = await Category.findAll({
          where: {
            flag: true  // Lọc các danh mục có flag = 1
          }
        });
        return categories;
      } catch (error) {
        throw new Error('Error fetching categories');
      }
    },
  
    // Tạo danh mục mới
    createCategory: async (data) => {
      try {
        const newCategory = await Category.create(data);
        return newCategory;
      } catch (error) {
        throw new Error('Error creating category');
      }
    },
  
    // Cập nhật danh mục
    updateCategory: async (categoryId, categoryData) => {
      try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          throw new Error('Category not found');
        }
        await category.update(categoryData);
        return category;
      } catch (error) {
        throw new Error('Error updating category');
      }
    },
  
    // Xóa danh mục
    deleteCategory: async (categoryId) => {
      try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          throw new Error('Category not found');
        }
        category.flag = false;
        await category.save();
        return categoryId; // Trả về ID của danh mục đã xóa
      } catch (error) {
        throw new Error('Error deleting category');
      }
    },
  };
  
  module.exports = categoryService;
  