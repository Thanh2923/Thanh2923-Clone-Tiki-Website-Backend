const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();


router.get('/', cartController.getCart);


router.post('/', cartController.addToCart);


router.put('/:id', cartController.updateCartItem);

router.delete('/',  cartController.removeFromInCartId);

// Xóa tất cả sản phẩm trong giỏ hàng của người dùng
router.delete('/removeAllCart',  cartController.removeFromCartByUserId);


module.exports = router;
