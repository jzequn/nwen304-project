const path = require('path');
const Game = require('../models/game.model');
Sequelize = require('sequelize');

exports.getIndex = (req, res, next) => {
    res.render('index');
}

exports.getShopItem = (req, res, next) => {
    Game.findOne({ where: { game_id: req.param('game_id') } }).then(theGame => {
        res.render('shop/shop-item', {
            game: theGame
        });
    })
}

exports.getSearch = (req, res, next) => {
    const Op = Sequelize.Op;
    let search = req.param('search');
    search = '%' + search + '%';
    console.log(req.param('search'));
    Game.findAll({
        where: {
            title: {
                [Op.iLike]: '%' + search + '%'
            }
        }
    }).then(results => {
        console.log(results)
        res.render('shop/search-results', {
            results: results
        })
    })
}

// this will go to cart page!!!
exports.getCart = (req, res, next) => {
    //check whether user is login, if not, redirect to login page
    req.user.getCart()
    .then(cart => {
      return cart.getGames()
        .then(cartGames => {
          res.render("shop/cart", {
            products: cartGames,
          });
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.addToCart = (req, res, next) => {
    console.log('add-to-cart, req.body', req.body);
    const { game_id } = req.body;
    /**
     *      find the game by id in the database. 
            // check whether user's cart has this game
            // if user's cart has this game, increase the quantity
            // if not, create this game in user's cart, set its quantity to 1
            // add game to user's cart
    */
    // if no, redirect to login page, if login succeeded, 
    // back to addToCart. 
    // else redirect to login page
    let fetchedCart;
    let newQuantity = 1;

    const user = req.user;
    user.createCart();
    user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getGames({ where: { game_id: game_id } })
        })
        .then(games=>{
            let game;
            if(games.length>0){
                game = games[0];
            }
            if(game){
                const oldQuantity = game.cartItem.quantity;
                newQuantity = oldQuantity +1;
                return game;
            }
            return Game.findByPk(game_id);
        })
        .then(game=>{
            return fetchedCart.addGame(game,{
                through:{quantity:newQuantity}
            })
        })
        .then(()=>{
            res.redirect('/shop/cart');
        })
}