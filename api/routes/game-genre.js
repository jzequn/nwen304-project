/**
 * Module: game-genre route (restful api)
 * Author: Zequn Jiang
 */
const express = require('express')
const router = express.Router()
const gameGenreController = require('../controllers/game-genre')

/**
 * GameGenre list
 * Author: Zequn Jiang
 */
router.get('/game-genres',gameGenreController.getGameGenres)

/**
 * One game genre
 * Method: get,post,put,delete
 * Author: Zequn Jiang
 */
router.get('/game-genre/:gameId',gameGenreController.getGameGenreById)
router.post('/game-genre',gameGenreController.postOneGameGenre)
router.put('/game-genre/:genreId',gameGenreController.putGameGenreById)
router.delete('/game-genre/:genreId',gameGenreController.deleteGameGenreById)


module.exports = router;