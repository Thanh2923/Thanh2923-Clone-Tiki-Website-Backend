const orderService = require('../services/orderService');
const orderDetailService = require('../services/orderItemService');
const cartService = require('../services/cartService');

const orderController = {
  // Lấy tất cả đơn hàng của người dùng
  getOrders: async (req, res) => {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrdersByUserId: async (req, res) => {
    const userId = req.user.id;
    try {
      const orders = await orderService.getOrdersByUser(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createOrder: async (req, res) => {
    const userId = req.user.id;
    const { orderDetail, totalPrice, cartId } = req.body;
  
    try {
      const newOrder = await orderService.createOrder({ userId, totalPrice });
      
      if (!newOrder) {
        return res.status(400).json({ message: "Không thể tạo đơn hàng" });
      }
  
      for (const item of orderDetail) {
        await orderDetailService.createOrderItem({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
      }
  
      if (Array.isArray(cartId) && cartId.filter(id => id != null).length > 0) {
        await cartService.removeFromInCartId(cartId.filter(id => id != null));
      }
      
      res.status(201).json({ message: "Đặt hàng thành công", order: newOrder.id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  updateOrder: async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
      const updatedOrder = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (req, res) => {
    const orderId = req.params.id;
    try {
      await orderService.deleteOrder(orderId);
      res.status(200).json({ message: `Order with ID ${orderId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderController;
