const cartService = require('../services/cartService');

const cartController = {
  // Lấy giỏ hàng của người dùng
  getCart: async (req, res) => {
    const userId = req.user.id;
    try {
      const cartItems = await cartService.getCartByUser(userId);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (req, res) => {
    const userId = req.user.id;
    const {  productId, quantity } = req.body;
    const data = {userId,productId, quantity}
    try {
      const newCartItem = await cartService.addToCart(data);
      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (req, res) => {
    const cartId = req.params.id;
    const { quantity } = req.body;
    console.log(quantity,cartId)
    try {
      const updatedCartItem = await cartService.updateCartItem(cartId, quantity);
      res.status(200).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },


  

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (req, res) => {
    const cartId = req.params.id;
    try {
      await cartService.removeFromCart(cartId);
      res.status(200).json({ message: `Cart item with ID ${cartId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromInCartId: async (req, res) => {
      const {cartId} = req.body;
      try {
        await cartService.removeFromInCartId(cartId);
        res.status(200).json({ message: `Cart item with ID ${cartId} deleted successfully` });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    removeFromCartByUserId: async (req, res) => {
      const userId = req.user.id;
      try {
        await cartService.removeFromCartByUserId(userId);
        res.status(200).json({ message: `Cart item with ID  deleted successfully` });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
};



module.exports = cartController;
