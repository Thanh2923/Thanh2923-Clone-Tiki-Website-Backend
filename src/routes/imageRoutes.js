const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

// Lấy tất cả hình ảnh của sản phẩm
router.get('/:productId', imageController.getImages);

// Thêm hình ảnh vào sản phẩm
router.post('/', imageController.addImage);

// Cập nhật thông tin hình ảnh
router.put('/:id', imageController.updateImage);

// Xóa hình ảnh khỏi sản phẩm
router.delete('/:id', imageController.removeImage);

module.exports = router;
