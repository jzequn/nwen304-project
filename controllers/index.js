// const User = require('../models/user.model')
const Game = require('../models/game.model')

exports.getIndex = (req, res, next) => {

    Game.findAll()
        .then(games =>{            
            res.render('shop/shop', {
                games: games
            });
        })
        //res.render('shop/shop-test');
        
    /*User.findAll()
        .then(users => {
            // delete all the user with no username
            // users.map(user=>{
            //     if(user.username===null){
            //         user.destroy();
            //     }
            // })
            
            // delete all user 
            // users.map(user => {
            //     user.destroy()
            // })

            // console.log("users", users)
            res.render('index', {
                users: users
            })
        })
        .catch(err => {
            console.log(err)
        })*/
}



