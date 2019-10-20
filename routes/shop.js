const express = require('express')

router = express.Router();

const shopController = require('../controllers/shop')

router.get('/shop/search-results', shopController.getSearch);
router.get('/shop/shop-item', shopController.getShopItem);
router.get('/shop/cart', shopController.addToCart);

module.exports = router;