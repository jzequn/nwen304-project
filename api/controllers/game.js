const pool = require('../../util/postgres');
/**
 * Module: game route (restful api)
 * Author: Zequn Jiang
 */
const Game = require('../../models/game.model')

/**
 * Get the game list from postgreSQL database
 * Author: Zequn Jiang
 */
exports.getGames = (req, res, next) => {
    pool.query('select * from games')
        .then(result => {
            if (result.rows.length > 0) {
                res.status(200).json({
                    message: 'Fetch games successfully',
                    games: result.rows
                })
            } else {
                res.status(404).json({
                    message: 'No games found!',
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'server error'
            })
        })

}


/**
 * Get a game by primary key - id, from postgreSQL database
 * Author: Zequn Jiang
 */
exports.getGameById = (req, res, next) => {
    const gameId = req.params.gameId;
    const queryString = `SELECT * FROM games WHERE games.game_id = ${gameId}`;
    pool.query(queryString)
        .then(result => {
            if (result.rows.length > 0) {
                res.status(200).json({
                    message: 'Fetch game successfully',
                    game: result.rows
                })
            } else {
                res.status(404).json({
                    message: 'No game found!',
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error executing query',
            })
        })
}


/**
 * Post one game to postgreSQL database
 * Author: Zequn Jiang
 */
exports.postOneGame = (req, res, next) => {
    // add error handle, if no info is provided!!

    const { title, price, description, num_in_stock, genre, players, platform } = req.body;
    console.log('req.body', req.body)
    const queryString = `
        insert into games (title,price,description,num_in_stock,genre,players,platform)
        values('${title}',${price},'${description}',${num_in_stock},'${genre}','${players}','${platform}')
    `;
    console.log('querySTring', queryString)
    pool.query(queryString)
        .then(result => {
            res.status(200).json({
                message: 'Post one game successfully!',
                game: {
                    title: title,
                    price: price,
                    description: description,
                    num_in_stock: num_in_stock,
                    genre: genre,
                    players: players,
                    platform: platform
                }
            })
        }).catch(err => {
            res.status(500).json({
                message: 'Error executing query',
            })
        })
}



/**
 * Delete game by primary key - id, from postgreSQL database
 * Author: Zequn Jiang
 */
exports.deleteGameById = (req, res, next) => {
    // How to prevent sql injection? How to handling flexible inputs
    const gameId = req.params.gameId;
    const queryString = `
        delete from games where game_id = ${gameId}
    `;
    pool.query(queryString)
        .then(result => {
            res.status(200).json({
                message: 'Delete game successfully!',
                game_id: gameId
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error executing query',
            })
        })
}

/**
 * Edit game by id to postgreSQL database
 * Author: Zequn Jiang
 */
exports.putGameById = (req, res, next) => {
    const { gameId } = req.params;
    const { title, price, description, num_in_stock, genre, players, platform } = req.body;

    const queryString_get = `SELECT * FROM games WHERE games.game_id = ${gameId}`;
    const queryString_update = `
        update games
        set title = '${title}', price = ${price}, description = '${description}',num_in_stock = ${num_in_stock}, genre='${genre}',players='${players}',platform='${platform}'
        where game_id = ${gameId}
    `;
    const queryString_insert = `
        insert into games (title,price,description,num_in_stock,genre,players,platform)
        values('${title}',${price},'${description}',${num_in_stock},'${genre}','${players}','${platform}')
    `;



    pool.query(queryString_get)
        .then(result => {
            if (result.rows.length > 0) {
                //if game exist, update game
                pool.query(queryString_update)
                    .then(result => {
                        res.status(200).json({
                            message: 'Update game successfully!',
                            game: {
                                title: title,
                                price: price,
                                description: description,
                                num_in_stock: num_in_stock,
                                genre: genre,
                                players: players,
                                platform: platform
                            }
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Error executing query',
                        })
                    })
            } else {
                //if game do not exist, create one
                pool.query(queryString_insert)
                    .then(result => {
                        res.status(200).json({
                            message: 'Game do not exist, create one game successfully!',
                            game: {
                                title: title,
                                price: price,
                                description: description,
                                num_in_stock: num_in_stock,
                                genre: genre,
                                players: players,
                                platform: platform
                            }
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: 'Error executing query',
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error executing query',
            })
        })
}