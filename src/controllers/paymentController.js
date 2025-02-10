const paymentService = require("../services/paymentService");  // Đảm bảo bạn import đúng

const paymentController = {
  // Tạo thanh toán mới
  createPayment: async (req, res) => {
    const { orderId, amount, paymentMethod } = req.body;
    const userId = req.user.id;
  
    try {
      const { payment, zalopayUrl } = await paymentService.createPayment({
        orderId,
        userId,
        amount,
        paymentMethod,
      });

  
      res.status(201).json({
        payment,
        zalopayUrl, 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

  // Cập nhật trạng thái thanh toán
  updatePayment: async (req, res) => {
    const { transactionId, status } = req.body;
    try {
      const updatedPayment = await paymentService.updatePaymentStatus(transactionId, status);
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = paymentController;
