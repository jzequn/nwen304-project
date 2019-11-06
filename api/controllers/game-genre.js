/**
 * Module: game-genre controller (restful api)
 * Author: Zequn Jiang
 */
const GameGenre = require('../../models/game-genre.model')

/**
 * Get the GameGenre list from postgreSQL database
 * Author: Zequn Jiang
 */
exports.getGameGenres = (req, res, next) => {
    GameGenre.findAll()
        .then(gameGenres => {
            if (!gameGenres) {
                res.status(404).json({
                    message: 'No gameGenres found!'
                })
                // next()
            } else {
                res.status(200).json({
                    message: 'Fetch GameGenre list successfully',
                    gameGenres: gameGenres
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Fetch GameGenre list fail!',
            })
        })
}


/**
 * Get a GameGenre by primary key - id, from postgreSQL database
 * Author: Zequn Jiang
 */
exports.getGameGenreById = (req, res, next) => {
    const GameGenreId = req.params.GameGenreId;
    GameGenre.findByPk(GameGenreId)
        .then(GameGenre => {
            if (!GameGenre) {
                // console.log('no gameGenres found!')
                res.status(404).json({
                    message: 'No GameGenre found!'
                })
                // next()
            } else {
                // console.log('found one Game!')
                res.status(200).json({
                    message: 'Fetch GameGenre successfully',
                    GameGenre: GameGenre
                })
            }

        })
        .catch(err => {
            // console.log('500 error!')
            res.status(500).json({
                message: 'Fetch GameGenre fail!',
            })
        })
}



/**
 * Post one GameGenre to postgreSQL database
 * Author: Zequn Jiang
 */
exports.postOneGameGenre = (req, res, next) => {

    // add error handle, if no info is provided!!
    const { genreId, gameId } = req.body;
    let error;
    if(isNaN(+genreId) ||isNaN(+gameId)){
        error = 'genreId or gameId should be integer'
    }
    GameGenre.create({
        genre_id: genreId,
        game_id: gameId
    })
        .then(gameGenre => {
            res.status(201).json({
                message: 'Created GameGenre successfully',
                Game: gameGenre
            })
        })
        .catch(err => {
            // throw err;
            console.log(err)
            res.status(500).json({
                message: 'Create GameGenre fail!',
                error:error
            })
        })
}



/**
 * Delete GameGenre by primary key - id, from postgreSQL database
 * Author: Zequn Jiang
 */
exports.deleteGameGenreById = (req, res, next) => {
    const genreId = req.params.genreId;
    let error;
    if(isNaN(genreId)){
        error = 'genre_id should be integer'
    }
    let gameGenre;
    GameGenre.findByPk(genreId)
        .then(GameGenre => {
            if (!GameGenre) {
                res.status(404).json({
                    message: 'No GameGenre found! with genre_id:'+genreId
                })
            } else {
                gameGenre = GameGenre;
                GameGenre.destroy();
                res.status(200).json({
                    message: 'Delete GameGenre successfully',
                    deletedGameGenre: gameGenre
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                message: 'Delete GameGenre fail!',
                error:error
            })
        })
}

/**
 * Edit GameGenre by id to postgreSQL database
 * Author: Zequn Jiang
 */
exports.putGameGenreById = (req, res, next) => {
    const { genreId } = req.params;
    const { gameId } = req.body;
    let error;
    if(isNaN(genreId) || isNaN(gameId)){
        error = 'genreId should be or gameId should be Integer'
    }
    GameGenre.findByPk(genreId)
        .then(gameGenre => {
            if (!gameGenre) {// if no Game found! create one
                return GameGenre.create({
                    genre_id: genreId,
                    game_id: gameId
                }).then(gameGenre => {
                    return gameGenre;
                })
            } else {// edit this GameGenre
                // only update related info if it is they are provided
                if (gameId) {
                    gameGenre.game_id = gameId;
                }
                return gameGenre.save();
            }
        })
        .then(GameGenre=>{
            res.status(201).json({
                message: 'Put GameGenre successfully',
                GameGenre: GameGenre
            })
        })
        .catch(err => {
            res.status(500).json({    
                message: 'Put GameGenre fail!',
                error:error
            })
        })
}