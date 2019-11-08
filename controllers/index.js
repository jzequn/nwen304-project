/**
 * Author: Zequn Jiang
 * Render index page so that user can browse games
 */
// const Game = require('../models/game.model')

exports.getIndex = (req, res, next) => {
    pool.query('select * from games')
        .then(result => {
            if (result.rows.length > 0) {
                res.render('shop/shop', {
                    games: result.rows
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'server error'
            })
        })


    // Game.findAll()
    //     .then(games => {
    //         res.render('shop/shop', {
    //             games: games
    //         });
    //     })
}



