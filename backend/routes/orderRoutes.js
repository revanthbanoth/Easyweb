const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);

module.exports = router;
