const { Order,User } = require('../models');

const orderService = {
  // Lấy tất cả đơn hàng của một người dùng
  getOrders: async ( ) => {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (error) {
      
      throw new Error('Error fetching orders');
    }
  },


  getOrdersByUser: async ( userId) => {
    try {
      const orders = await Order.findAll({
        where: {  userId },
        include: [
        {
          model: User,           // Kết nối với bảng Brand
          as: 'user',            // Alias cho mối quan hệ
        }]
      });
      return orders;
    } catch (error) {
      
      throw new Error('Error fetching orders');
    }
  },

  // Thêm đơn hàng mới
  createOrder: async (data) => {
    console.log(data.totalPrice)
    try {
      const newOrder = await Order.create(data);
      return newOrder;
    } catch (error) {
      throw new Error('Error creating order');
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (orderId, status) => {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      await order.update({ status });
      return order;
    } catch (error) {
      throw new Error('Error updating order');
    }
  },

  // Xóa một đơn hàng
  deleteOrder: async (orderId) => {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      await order.destroy();
      return orderId; // Trả về ID của đơn hàng đã xóa
    } catch (error) {
      throw new Error('Error deleting order');
    }
  },
};

module.exports = orderService;
