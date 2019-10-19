const express = require('express')

router = express.Router();

const shopController = require('../controllers/shop')

router.post('/shop/search', shopController.getSearch);

module.exports = router;