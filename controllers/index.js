/**
 * Author: Zequn Jiang
 * Render index page for test purpose.
 */
const Game = require('../models/game.model')

exports.getIndex = (req, res, next) => {
    Game.findAll()
        .then(games => {
            res.render('shop/shop', {
                games: games
            });
        })
}



