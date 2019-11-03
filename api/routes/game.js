const express = require('express')

const router = express.Router()

const gameController = require('../controllers/game')


/**
 * Game list
 */
router.get('/games',gameController.getGames)

/**
 * One game
 * Method: get,post,put,delete
 */
router.get('/game/:gameId',gameController.getGameById)
router.post('/game',gameController.postOneGame)
router.put('/game/:gameId',gameController.putGameById)
router.delete('/game/:gameId',gameController.deleteGameById)

module.exports = router;