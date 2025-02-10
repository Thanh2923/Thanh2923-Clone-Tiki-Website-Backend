// /routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy tất cả người dùng
router.get('/', userController.getUsers);
router.get('/byId', userController.getUsersById);
// Tạo người dùng mới
router.post('/', userController.createUser);

// Cập nhật thông tin người dùng
router.patch('/', userController.updateUser);

// Xóa người dùng
router.delete('/:id', userController.deleteUser);

module.exports = router;
