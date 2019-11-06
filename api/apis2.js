/**
 * Module: restful api routes
 * Combine all the api routes in one file
 * Author: Zequn Jiang
 */
const express = require('express')
const router = express.Router()

/**
 * Combine all the api routes in one file
 * Author: Zequn Jiang
 */
router.use('/',require('./routes/cart'))
router.use('/',require('./routes/game'))
router.use('/',require('./routes/game-genre'))

router.use('/',require('./routes/order'))


module.exports = router;