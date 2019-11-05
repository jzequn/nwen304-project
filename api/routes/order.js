const express = require('express')

const router = express.Router()

const orderController = require('../controllers/order')

router.get('/order', orderController.getOrders)

router.get('/order/:orderID', orderController.getOrderByID)
router.post('/order', orderController.postOneOrder)
router.delete('/order/:orderID', orderController.deleteOrderByID)
router.put('/order/:orderID', orderController.putOneOrderByID)



module.exports = router;