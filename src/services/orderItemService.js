const { OrderItem,Product } = require('../models');

const orderItemService = {
  // Lấy tất cả các items của một đơn hàng
  getItemsByOrder: async (orderId) => {
    try {
      const items = await OrderItem.findAll({
        where: { orderId },
        include: [
          {
            model: Product,           // Kết nối với bảng Brand
            as: 'product',            // Alias cho mối quan hệ
          }]
      });
      return items;
    } catch (error) {
      throw new Error('Error fetching order items');
    }
  },

  // Thêm một item vào đơn hàng
  createOrderItem: async (data) => {
    try {
      const newOrderItem = await OrderItem.create(data);
      return newOrderItem;
    } catch (error) {
      throw new Error('Error creating order item');
    }
  },

  // Cập nhật số lượng hoặc giá của một order item
  updateOrderItem: async (orderItemId, data) => {
    try {
      const orderItem = await OrderItem.findByPk(orderItemId);
      if (!orderItem) {
        throw new Error('Order item not found');
      }
      await orderItem.update(data);
      return orderItem;
    } catch (error) {
      throw new Error('Error updating order item');
    }
  },

  // Xóa một order item
  deleteOrderItem: async (orderItemId) => {
    try {
      const orderItem = await OrderItem.findByPk(orderItemId);
      if (!orderItem) {
        throw new Error('Order item not found');
      }
      await orderItem.destroy();
      return orderItemId; // Trả về ID của order item đã xóa
    } catch (error) {
      throw new Error('Error deleting order item');
    }
  },
};

module.exports = orderItemService;
