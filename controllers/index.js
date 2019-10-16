const User = require('../models/user.model')

exports.getIndex = (req, res, next) => {
    res.render('shop/shop');    
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

exports.getShopItem = (req, res, next) => {
    res.render('shop/shop-item');
}

exports.addToCart = (req, res, next) => {
    res.render('shop/cart');
}