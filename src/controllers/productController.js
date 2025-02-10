const productService = require('../services/productService');

const productController = {
 
  getProducts: async (req, res) => {
    const { limit, page, categoryId, brandId, minPriceSale, maxPriceSale } = req.query;
   
    const limitNum = limit ? parseInt(limit) : 30;  // Giới hạn mặc định là 10
    const pageNum = page ? parseInt(page) : 1;  // Trang mặc định là 1
    try {
      const products = await productService.getAllProducts(limitNum, pageNum, categoryId, brandId, minPriceSale, maxPriceSale );
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  searchProducts: async (req, res) => {
    const { searchQuery,limit,page } = req.query;
   console.log(searchQuery)
    const limitNum = limit ? parseInt(limit) : 10;  // Giới hạn mặc định là 10
    const pageNum = page ? parseInt(page) : 1;  // Trang mặc định là 1
    try {
      const products = await productService.searchProducts(limitNum, pageNum,searchQuery );
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
     const productId = req.params.id;
  
    try {
      const products = await productService.getProductById(productId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, sale, priceSale, stock, categoryId } = req.body;
    try {
      const updatedProduct = await productService.updateProduct(productId, { name, description, price, sale, priceSale, stock, categoryId });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      await productService.deleteProduct(productId);
      res.status(200).json({ message: `Product with ID ${productId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
