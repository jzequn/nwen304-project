const express = require('express')

const router = express.Router()

const cartController = require('../controllers/cart')

router.get('/carts',cartController.getCarts)


module.exports = router;
