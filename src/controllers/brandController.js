const brandService = require('../services/brandService');

const brandController = {
  // Lấy tất cả các thương hiệu
  getAllBrands: async (req, res) => {
    try {
      const categoryId = req.params.id;

      const brands = await brandService.getAllBrands(categoryId);
      res.status(200).json(brands);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Tạo một thương hiệu mới
  createBrand: async (req, res) => {
    const { name } = req.body;
    try {
      const newBrand = await brandService.createBrand({ name });
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật thương hiệu
  updateBrand: async (req, res) => {
    const brandId = req.params.id;
    const { name } = req.body;
    try {
      const updatedBrand = await brandService.updateBrand(brandId, { name });
      res.status(200).json(updatedBrand);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa thương hiệu
  deleteBrand: async (req, res) => {
    const brandId = req.params.id;
    try {
      await brandService.deleteBrand(brandId);
      res.status(200).json({ message: `Brand with ID ${brandId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = brandController;
