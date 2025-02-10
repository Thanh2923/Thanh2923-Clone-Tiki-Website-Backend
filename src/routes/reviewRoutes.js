const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Lấy tất cả review của một sản phẩm
router.get('/product/:productId', reviewController.getReviewsByProduct);

// Lấy tất cả review của người dùng
router.get('/user/:userId', reviewController.getReviewsByUser);

// Tạo một review mới
router.post('/', reviewController.createReview);

// Cập nhật review
router.put('/:id', reviewController.updateReview);

// Xóa một review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
