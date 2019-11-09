const express = require('express')

router = express.Router();

const shopController = require('../controllers/shop')
const {ensureAuthenticated}= require('../util/auth')

/**
 * route: '/shop/cart', '/shop/add-to-cart'
 * Author: Zequn Jiang
 */
router.get('/shop/cart', ensureAuthenticated, shopController.getCart);
router.post('/shop/add-to-cart',ensureAuthenticated, shopController.addToCart);

// router.post('/shop/testAddToCart', ensureAuthenticated, shopController.testAddToCart)


router.get('/shop/search-results', shopController.getSearch);
router.get('/shop/shop-item', shopController.getShopItem);
router.get('/shop/advanced-search', shopController.getAdvancedSearchPage);
router.get('/shop/get-advanced-search', shopController.getAdvancedSearchResults);
router.get('/shop/get-games-of-genre/::genre', shopController.getGamesByGenre);
module.exports = router;