const { Brand,Category } = require('../models');

const brandService = {
  // Lấy tất cả các thương hiệu
  getAllBrands: async (categoryId) => {
    try {
      const brands = await Brand.findAll({
        where: {
          flag: true ,
          categoryId: categoryId,
        }
      
      });
      return brands;
    } catch (error) {
      throw new Error('Error fetching brands');
    }
  },

  // Tạo một thương hiệu mới
  createBrand: async (data) => {
    try {
      const newBrand = await Brand.create(data);
      return newBrand;
    } catch (error) {
      throw new Error('Error creating brand');
    }
  },

  // Cập nhật thông tin thương hiệu
  updateBrand: async (brandId, data) => {
    try {
      const brand = await Brand.findByPk(brandId);
      if (!brand) {
        throw new Error('Brand not found');
      }
      await brand.update(data);
      return brand;
    } catch (error) {
      throw new Error('Error updating brand');
    }
  },

  // Xóa thương hiệu
  deleteBrand: async (brandId) => {
    try {
      const brand = await Brand.findByPk(brandId);
      if (!brand) {
        throw new Error('Brand not found');
      }
      brand.flag = false;
        await brand.save();
      return brandId; // Trả về ID của thương hiệu đã xóa
    } catch (error) {
      throw new Error('Error deleting brand');
    }
  },
};

module.exports = brandService;
