const { Product,Category,Image } = require('../models');
const { Op } = require('sequelize');
const productService = {
  getAllProducts: async (limit, page, categoryId, brandId, minPriceSale=0, maxPriceSale) => {
    try {
      const whereConditions = {
        flag: true,  // Điều kiện lọc mặc định (flag = true)
      };

      // Thêm điều kiện lọc theo categoryId nếu có
      if (categoryId) {
        whereConditions.categoryId = categoryId;
      }

      // Thêm điều kiện lọc theo brandId nếu có
      if (brandId) {
        whereConditions.brandId = brandId;
      }

      // Thêm điều kiện lọc theo giá sale nếu có
      if (maxPriceSale) {
        whereConditions.priceSale = {
          [Op.between]: [minPriceSale, maxPriceSale],  // Lọc theo priceSale trong khoảng giá
        };
      }

      const totalProducts = await Product.count({
        where: whereConditions,
      });

      // Tính tổng số trang
      const totalPages = Math.ceil(totalProducts / limit);

      // Thực hiện truy vấn với điều kiện lọc và phân trang
      const products = await Product.findAll({
        where: whereConditions,
        limit: limit,   // Giới hạn số sản phẩm trả về
        offset: (page - 1) * limit,
        include: [{
          model: Image,           // Kết nối với bảng Image
          as: 'images',           // Alias cho mối quan hệ
          required: false,         // Nếu không có ảnh thì vẫn trả sản phẩm
          limit: 5,                // Lấy tối đa 5 ảnh cho mỗi sản phẩm
        },
        {
          model: Category,           // Kết nối với bảng Brand
          as: 'category',            // Alias cho mối quan hệ
        }
      ],
        
      });

      return {
        products,        // Danh sách sản phẩm
        currentPage: page,  // Trang hiện tại
        totalPages: totalPages,  // Tổng số trang
      };
    } catch (error) {
      console.error("Error in getAllProducts:", error.message);
      throw new Error('Error fetching products');
    }
  },

 searchProducts : async (limit, page, searchQuery) => {
    try {
        const whereConditions = {
            flag: true, // Chỉ lấy sản phẩm có flag = true
        };

        // Nếu có searchQuery, tìm kiếm theo name hoặc description
        if (searchQuery) {
            const lowerSearchQuery = `%${searchQuery.toLowerCase()}%`;
            whereConditions[Op.or] = [
                { name: { [Op.like]: lowerSearchQuery } },
                { description: { [Op.like]: lowerSearchQuery } }
            ];
        }

        // Đếm tổng số sản phẩm thỏa mãn điều kiện
        const totalProducts = await Product.count({ where: whereConditions });

        // Tính tổng số trang
        const totalPages = Math.ceil(totalProducts / limit);

        // Truy vấn danh sách sản phẩm có phân trang
        const products = await Product.findAll({
            where: whereConditions,
            limit: limit,
            offset: (page - 1) * limit,
            include: [
                {
                    model: Image,
                    as: 'images',
                    required: false,
                    limit: 5,
                },
                {
                    model: Category,
                    as: 'category',
                }
            ],
        });

        return {
            products,
            currentPage: page,
            totalPages: totalPages,
        };
    } catch (error) {
        console.error("Error in searchProducts:", error.message);
        throw new Error('Error searching products');
    }
},
  
  
  
  getProductsByIdCategory: async (categoryId) => {
    try {
      const products = await Product.findAll({
        where: {
          categoryId: categoryId // Lọc theo categoryId
        },
        include: [{
          model: Category, // Nếu muốn lấy thông tin về category
          as: 'category', // Tên alias cho association
          required: false // Giúp tránh bỏ qua những product không có category
        }]
      });
      return products;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },
  getProductById: async (productId) => {
    try {
      const product = await Product.findOne({
        where: {
          id: productId // Lọc theo id sản phẩm
        },
        include: [{
          model: Image,           // Kết nối với bảng Image
          as: 'images',           // Alias cho mối quan hệ
          required: false,         // Nếu không có ảnh thì vẫn trả sản phẩm
          limit: 5,                // Lấy tối đa 5 ảnh cho mỗi sản phẩm
        }]
      });
  
      // Kiểm tra nếu sản phẩm không tồn tại
      if (!product) {
        throw new Error('Product not found');
      }
  
      return product;
    } catch (error) {
      throw new Error('Error fetching product by ID');
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (data) => {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (error) {
      throw new Error('Error creating product');
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (productId, productData) => {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      await product.update(productData);
      return product;
    } catch (error) {
      throw new Error('Error updating product');
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (productId) => {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      product.flag = false;
        await product.save();
      return productId; // Trả về ID của sản phẩm đã xóa
    } catch (error) {
      throw new Error('Error deleting product');
    }
  },
};

module.exports = productService;
