//  Author: Antony Helsby
const express = require('express')

const router = express.Router()

const cartItemIDController = require('../controllers/cart-item')

router.get('/cart-item', cartItemIDController.getCartItems)

router.get('/cart-item/:cart-itemID', cartItemIDController.getCartItemByID)
router.post('/cart-item', cartItemIDController.postOneCartItemOrder)
router.delete('/cart-item/:cart-itemID', cartItemIDController.deleteCartItemByID)
router.put('/cart-item/:cart-itemID', cartItemIDController.putOneCartItemByID)



module.exports = router;