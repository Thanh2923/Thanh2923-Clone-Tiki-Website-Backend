const categoryService = require('../services/categoryService');

const categoryController = {
  // Lấy tất cả danh mục
  getCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Tạo danh mục mới
  createCategory: async (req, res) => {
    const { name, image } = req.body;
    try {
      const newCategory = await categoryService.createCategory({ name, image });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật danh mục
  updateCategory: async (req, res) => {
    const categoryId = req.params.id;
    const { name, image } = req.body;
    try {
      const updatedCategory = await categoryService.updateCategory(categoryId, { name, image });
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa danh mục
  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;
    try {
      await categoryService.deleteCategory(categoryId);
      res.status(200).json({ message: `Category with ID ${categoryId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryController;
