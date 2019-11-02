const express = require('express')

const router = express.Router()

const gameController = require('../controllers/game')


router.get('/games',gameController.getGames)

module.exports = router;