const orderItemService = require('../services/orderItemService');

const orderItemController = {
  // Lấy tất cả các item của đơn hàng
  getItems: async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const items = await orderItemService.getItemsByOrder(orderId);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Thêm một item vào đơn hàng
  createItem: async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
    try {
      const newItem = await orderItemService.createOrderItem({ orderId, productId, quantity, price });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Cập nhật thông tin của order item
  updateItem: async (req, res) => {
    const orderItemId = req.params.id;
    const { quantity, price } = req.body;
    try {
      const updatedItem = await orderItemService.updateOrderItem(orderItemId, { quantity, price });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa một item khỏi đơn hàng
  deleteItem: async (req, res) => {
    const orderItemId = req.params.id;
    try {
      await orderItemService.deleteOrderItem(orderItemId);
      res.status(200).json({ message: `Order item with ID ${orderItemId} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderItemController;
