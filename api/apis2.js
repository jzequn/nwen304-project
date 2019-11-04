const express = require('express')
const router = express.Router()

router.use('/',require('./routes/cart'))

router.use('/',require('./routes/game'))


module.exports = router;