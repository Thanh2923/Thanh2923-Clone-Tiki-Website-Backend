const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

// Tạo payment mới
router.post("/", paymentController.createPayment);

// Cập nhật trạng thái thanh toán
router.put("/", paymentController.updatePayment);

module.exports = router;
