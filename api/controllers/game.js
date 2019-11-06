const Game = require('../../models/game.model')

/**
 * Get the game list from postgreSQL database
 */
exports.getGames = (req, res, next) => {    
    Game.findAll()
        .then(games => {
            if (!games) {
                res.status(404).json({
                    message: 'No games found!'
                })
                // next()
            }else{
                res.status(200).json({
                    message: 'Fetch game list successfully',
                    games: games
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                message: 'Fetch game list fail!',
            })
        })
}


/**
 * Get a game by primary key - id, from postgreSQL database
 */
exports.getGameById = (req, res, next) => {
    const gameId = req.params.gameId;
    Game.findByPk(gameId)
        .then(game => {
            if (!game) {                
                res.status(404).json({
                    message: 'No game found!'
                })
                // next()
            }else{                
                res.status(200).json({
                    message: 'Fetch game successfully',
                    game: game
                })
            }

        })
        .catch(err => {            
            res.status(500).json({
                message: 'Fetch game fail!',
            })
        })
}



/**
 * Post one game to postgreSQL database
 */
exports.postOneGame = (req, res, next) => {

    // add error handle, if no info is provided!!
    const { title, price, description, num_in_stock } = req.body;

    Game.create({
        title: title,
        price: price,
        description: description,
        num_in_stock: num_in_stock
    })
        .then(game => {
            res.status(201).json({
                message: 'Created game successfully',
                game: game
            })
        })
        .catch(err => {
            // throw err;
            res.status(500).json({
                message: 'Create game fail!',
            })
        })
}



/**
 * Delete game by primary key - id, from postgreSQL database
 */
exports.deleteGameById = (req, res, next) => {
    const gameId = req.params.gameId;
    let game;
    Game.findByPk(gameId)
        .then(game => {
            if (!game) {
                res.status(404).json({
                    message: 'No game found!'
                })
                // next()
            }else{
                game = game;
                return game.destroy();
            }

        })
        .then(result => {
            res.status(200).json({
                message: 'Delete game successfully',
                deletedGame: game
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Delete game fail!',
            })
        })
}

/**
 * Edit game by id to postgreSQL database
 */
exports.putGameById = (req, res, next) => {
    const { gameId } = req.params;
    const { title, price, description, num_in_stock } = req.body;

    Game.findByPk(gameId)
        .then(game => {
            if (!game) {// if no game found! create one
                return Game.create({
                    title: title,
                    price: price,
                    description: description,
                    num_in_stock: num_in_stock
                }).then(game => {
                    return game;
                })
                    .catch(err => {
                        res.status(500).json({
                            message: 'No game found and create game fail!',
                        })
                    })
            } else {// edit this game
                // only update related info if it is they are provided
                if (title) {
                    game.title = title;
                }
                if (description) {
                    game.description = description;
                }
                if (price) {
                    game.price = price
                }
                if (num_in_stock) {
                    game.num_in_stock = num_in_stock;
                }
                return game.save();
            }
        })
        .then(game => {
            res.status(201).json({
                message: 'Put game successfully',
                game: game
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Put game fail!',
            })
        })
}