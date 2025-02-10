const imageService = require('../services/imageService');

const imageController = {
  // Lấy tất cả hình ảnh của sản phẩm
  getImages: async (req, res) => {
    const productId = req.params.productId;
    try {
      const images = await imageService.getImagesByProduct(productId);
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Thêm hình ảnh vào sản phẩm
  addImage: async (req, res) => {
    const { productId, url } = req.body;
    try {
      const newImage = await imageService.addImage({ productId, url });
      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật thông tin hình ảnh
  updateImage: async (req, res) => {
    const imageId = req.params.id;
    const { url } = req.body;
    try {
      const updatedImage = await imageService.updateImage(imageId, { url });
      res.status(200).json(updatedImage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa một hình ảnh
  removeImage: async (req, res) => {
    const imageId = req.params.id;
    try {
      await imageService.removeImage(imageId);
      res.status(200).json({ message: `Image with ID ${imageId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = imageController;
