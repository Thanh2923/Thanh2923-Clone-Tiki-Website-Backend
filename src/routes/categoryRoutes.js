const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Lấy tất cả danh mục
router.get('/', categoryController.getCategories);

// Tạo danh mục mới
router.post('/', categoryController.createCategory);

// Cập nhật danh mục
router.put('/:id', categoryController.updateCategory);

// Xóa danh mục
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
