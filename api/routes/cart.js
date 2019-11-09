/**
 * Module -> cart route (restful api)
 * Author: Zequn Jiang
 */
const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

/**
 * Cart list
 * Method: get
 * Author: Zequn Jiang
 */
router.get('/carts',cartController.getCarts)

/**
 * One cart
 * Method: get,post,put,delete
 * Author: Zequn Jiang
 */
router.get('/cart/:cartId',cartController.getCartById)
router.post('/cart',cartController.postCart)
router.put('/cart/:cartId',cartController.putCartById)
router.delete('/cart/:cartId',cartController.deleteCartById)

module.exports = router;
