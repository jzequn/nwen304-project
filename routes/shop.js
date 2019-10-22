const express = require('express')

router = express.Router();

const shopController = require('../controllers/shop')
const {ensureAuthenticated}= require('../util/auth')

router.get('/shop/search-results', shopController.getSearch);
router.get('/shop/shop-item', shopController.getShopItem);
router.get('/shop/cart', ensureAuthenticated, shopController.getCart);
router.post('/shop/add-to-cart',ensureAuthenticated, shopController.addToCart);
module.exports = router;