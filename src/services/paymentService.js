const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const axios = require("axios");
const { Payment } = require("../models");

const ZALOPAY_APP_ID = "2554";  // Thay bằng App ID thực tế
const ZALOPAY_KEY1 = "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn"; 
const ZALOPAY_KEY2 = "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf";
const ZALOPAY_ENDPOINT = "https://sb-openapi.zalopay.vn/v2/create";
const YOUR_DOMAIN = "http://localhost:3000";

const paymentService = {
  createPayment: async ({ orderId, userId, amount, paymentMethod }) => {
    try {
      const config = {
        app_id: "2554",
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
      };
      const embed_data = { orderId: orderId };
  
      const items = [
        {
          item_name: "Website Bán hàng", 
          item_quantity: 1,
          item_price: amount
        }
      ];
      const transID = Math.floor(Math.random() * 1000000);
      const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format("YYMMDD")}_${transID}`, 
        app_user: "user123",
        app_time: Date.now(), 
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: amount,
        description: `Thanh toán online tiền đặt hàng #${transID}`,
        bank_code: "zalopayapp"
      };
  
     
      const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  
      const response = await axios.post(config.endpoint, null, { params: order });
     

        const newPayment = await Payment.create({
        orderId,
        userId,
        paymentMethod,
        status: "pending",
      });

      return { 
        payment:newPayment,
        zalopayUrl: response.data 
      };
    } catch (error) {
      console.error(" Error creating payment:", error.message);
      throw new Error(error.message || "Error creating payment");
    }
  },

  updatePaymentStatus: async (transactionId, status) => {
    try {
      console.log(" Updating Payment Status:", { transactionId, status });

      const payment = await Payment.findOne({ where: { transactionId } });
      if (!payment) {
        throw new Error("Payment not found");
      }

      payment.status = status;
      await payment.save();

      console.log(" Payment status updated:", payment);

      return payment;
    } catch (error) {
      console.error(" Error updating payment status:", error.message);
      throw new Error(error.message || "Error updating payment status");
    }
  },
};

module.exports = paymentService;
