const express = require('express');
const orderItemController = require('../controllers/orderItemController');
const router = express.Router();

// Lấy tất cả các items của đơn hàng
router.get('/:orderId', orderItemController.getItems);

// Thêm một item vào đơn hàng
router.post('/', orderItemController.createItem);

// Cập nhật thông tin của một order item
router.put('/:id', orderItemController.updateItem);

// Xóa một item khỏi đơn hàng
router.delete('/:id', orderItemController.deleteItem);

module.exports = router;
