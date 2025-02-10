const reviewService = require('../services/reviewService');

const reviewController = {
  // Lấy tất cả review của một sản phẩm
  getReviewsByProduct: async (req, res) => {
    const productId = req.params.productId;
    try {
      const reviews = await reviewService.getReviewsByProduct(productId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Lấy tất cả review của người dùng
  getReviewsByUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const reviews = await reviewService.getReviewsByUser(userId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Tạo một review mới
  createReview: async (req, res) => {
    const { userId, productId, rating, comment } = req.body;
    try {
      const newReview = await reviewService.createReview({ userId, productId, rating, comment });
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật review
  updateReview: async (req, res) => {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    try {
      const updatedReview = await reviewService.updateReview(reviewId, { rating, comment });
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa một review
  deleteReview: async (req, res) => {
    const reviewId = req.params.id;
    try {
      await reviewService.deleteReview(reviewId);
      res.status(200).json({ message: `Review with ID ${reviewId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reviewController;
