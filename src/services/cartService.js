const { Cart,Image,Product } = require('../models');

const cartService = {
   getCartByUser :async (userId) => {
    try {
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [{
          model: Product,        // Bao gồm thông tin sản phẩm
          as: 'product',         // Alias cho mối quan hệ với Product
          include: [{
            model: Image,        // Bao gồm ảnh của sản phẩm
            as: 'images',        // Alias cho mối quan hệ với Image
            required: false,      // Nếu không có ảnh thì vẫn trả về sản phẩm
            limit: 1,             // Lấy 1 ảnh (hoặc thay đổi nếu cần)
          }],
        }],
      });
  
      // Duyệt qua từng cart item và trả về kết quả với sản phẩm và ảnh
      return cartItems.map(item => {
        const cartItemJSON = item.toJSON();  // Chuyển đổi thành JSON
  
        return {
          ...cartItemJSON,
          product: {
            ...cartItemJSON.product,
            image: cartItemJSON.product.images.length > 0 ? cartItemJSON.product.images[0].url : null,  // Lấy ảnh đầu tiên hoặc null nếu không có ảnh
          }
        };
      });
    } catch (error) {
      console.error('Error fetching cart items:', error);  // In ra lỗi chi tiết
      throw new Error('Error fetching cart items');
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (data) => {
    try {
      const existingItem = await Cart.findOne({
        where: {
          userId: data.userId,
          productId: data.productId
        }
      });

      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
        existingItem.quantity += data.quantity;
        await existingItem.save();
        return existingItem;
      } else {
        // Nếu sản phẩm chưa có, tạo mới
        const newCartItem = await Cart.create(data);
        return newCartItem;
      }
    } catch (error) {
      throw new Error('Error adding item to cart');
    }
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (cartId, quantity) => {
    try {
      const cartItem = await Cart.findByPk(cartId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartId;
    } catch (error) {
      throw new Error('Error updating cart item');
    }
  },

  

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (cartId) => {
    console.log(cartId)
    try {
      const cartItem = await Cart.findByPk(cartId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
      await cartItem.destroy();
      return cartId; // Trả về ID của sản phẩm đã xóa
    } catch (error) {
      throw new Error('Error removing item from cart');
    }
  },

  removeFromInCartId: async (cartId) => {
    try {
      // Xóa các sản phẩm có cartId nằm trong mảng cartIds
      const result = await Cart.destroy({
        where: {
          id: cartId,  // Cart item có cartId nằm trong mảng này
        },
      });

      if (result === 0) {
        throw new Error('No items were removed');
      }

      return cartId; // Trả về danh sách các cartId đã xóa
    } catch (error) {
      throw new Error('Error removing items from cart');
    }
  },

  removeFromCartByUserId: async (userId) => {
    console.log(userId)
    try {
      const cartItems = await Cart.findAll({ where: { userId } });
      if (cartItems.length === 0) {
        throw new Error('No cart items found for this user');
      }
      await Cart.destroy({ where: { userId } });
      return { message: "Cart cleared successfully", userId };
    } catch (error) {
      throw new Error('Error removing items from cart');
    }
  },
};

module.exports = cartService;
