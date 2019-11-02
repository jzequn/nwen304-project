const Game = require('../../models/game.model')
exports.getGames = (req,res,next)=>{
    Game.findAll()
    .then(games=>{
        if(!games){
            res.status(404).json({
                message:'No games found!'
            })
            next()
        }
        res.status(200).json({
            message: 'fetched game list',
            games:games
        })
    })
    .catch(err=>{
        throw err;
    })

}