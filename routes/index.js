const express = require('express')

const router = express.Router();

const homeController = require('../controllers/index')

router.get('/', homeController.getIndex);
router.get('/shop/shop-item', homeController.getShopItem);
/*Should be POST*/router.get('/shop/cart', homeController.addToCart);


module.exports = router;