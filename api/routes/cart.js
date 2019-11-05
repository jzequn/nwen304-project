/**
 * Module -> cart route (restful api)
 * Author: Zequn Jiang
 */
const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

/**
 * Cart list
 * Method: get
 * Author: Zequn Jiang
 */
router.get('/carts',cartController.getCarts)

/**
 * One cart
 * Method: get,post,put,delete
 * Author: Zequn Jiang
 */
// router.get('/game-genre/:gameId',gameGenreController.getGameGenreById)
// router.post('/game-genre',gameGenreController.postOneGameGenre)
// router.put('/game-genre/:genreId',gameGenreController.putGameGenreById)
// router.delete('/game-genre/:genreId',gameGenreController.deleteGameGenreById)

module.exports = router;
