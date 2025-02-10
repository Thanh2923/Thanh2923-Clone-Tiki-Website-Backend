const { Review } = require('../models');

const reviewService = {
  // Lấy tất cả review của một sản phẩm
  getReviewsByProduct: async (productId) => {
    try {
      const reviews = await Review.findAll({
        where: { productId },
      });
      return reviews;
    } catch (error) {
      throw new Error('Error fetching reviews for product');
    }
  },

  // Lấy tất cả review của người dùng
  getReviewsByUser: async (userId) => {
    try {
      const reviews = await Review.findAll({
        where: { userId },
      });
      return reviews;
    } catch (error) {
      throw new Error('Error fetching reviews for user');
    }
  },

  // Tạo một review mới
  createReview: async (data) => {
    try {
      const newReview = await Review.create(data);
      return newReview;
    } catch (error) {
      throw new Error('Error creating review');
    }
  },

  // Cập nhật review
  updateReview: async (reviewId, data) => {
    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        throw new Error('Review not found');
      }
      await review.update(data);
      return review;
    } catch (error) {
      throw new Error('Error updating review');
    }
  },

  // Xóa review
  deleteReview: async (reviewId) => {
    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        throw new Error('Review not found');
      }
      review.flag = false;
        await review.save();
      return reviewId; // Trả về ID của review đã xóa
    } catch (error) {
      throw new Error('Error deleting review');
    }
  },
};

module.exports = reviewService;
