const { Image } = require('../models');

const imageService = {
  // Lấy tất cả hình ảnh của một sản phẩm
  getImagesByProduct: async (productId) => {
    try {
      const images = await Image.findAll({
        where: { productId },
      });
      return images;
    } catch (error) {
      throw new Error('Error fetching images');
    }
  },

  // Thêm một hình ảnh mới
  addImage: async (data) => {
    try {
      const newImage = await Image.create(data);
      return newImage;
    } catch (error) {
      throw new Error('Error adding image');
    }
  },

  // Cập nhật một hình ảnh
  updateImage: async (imageId, data) => {
    try {
      const image = await Image.findByPk(imageId);
      if (!image) {
        throw new Error('Image not found');
      }
      await image.update(data);
      return image;
    } catch (error) {
      throw new Error('Error updating image');
    }
  },

  // Xóa một hình ảnh
  removeImage: async (imageId) => {
    try {
      const image = await Image.findByPk(imageId);
      if (!image) {
        throw new Error('Image not found');
      }
      image.flag = false;
        await image.save();
      return imageId; // Trả về ID của hình ảnh đã xóa
    } catch (error) {
      throw new Error('Error removing image');
    }
  },
};

module.exports = imageService;
