/**
 * Author: Zequn Jiang
 * this will go to cart page!!!
 */
const path = require('path');
const Game = require('../models/game.model');
Sequelize = require('sequelize');
pool = require ('../util/postgres');

/**
 * Author: Zequn Jiang
 * render index page for test purpose
 */
exports.getIndex = (req, res, next) => {
    res.render('index');
}

// Author of getShopItem: Antony Helsby
exports.getShopItem = (req, res, next) => {
    
    queryText = 'SELECT * FROM games WHERE game_id=' + req.param('game_id');        
    pool.query(queryText, (err, result) => {        
        if(err){
            return console.error('error in getGamesByGenre', err)
        }            
        res.render('shop/shop-item', {
            game: result.rows,
        })
    })
}

// Author of getSearch: Antony Helsby
exports.getSearch = (req, res, next) => {
    const Op = Sequelize.Op;
    let search = req.param('search');
    search = '%' + search + '%';    
    Game.findAll({
        where: {
            title: {
                [Op.iLike]: search
            }
        }
    }).then(results => {        
        res.render('shop/search-results', {
            results: results
        })
    })
}

// Author of getGamesByGenre: Antony Helsby
exports.getGamesByGenre = (req, res, next) => {
    let genre = req.params.genre
    queryText = "SELECT * FROM games WHERE genre = '" + genre + "'";    
    
    pool.query(queryText, (err, result) => {        
        if(err){
            return console.error('error in getGamesByGenre', err)
        }            
        res.render('shop/search-results', {
            results: result.rows,
        })
    })
}

exports.getAdvancedSearchPage = (req, res, next) => {
    res.render('shop/advanced-search');
}

exports.getAdvancedSearchResults = (req, res, next) => {    
    const {genre, players, platform, requireAllSelections} = req.query
    let queryText = '';            
    if(requireAllSelections == undefined){        
            /*queryText = 
        `SELECT * 
        FROM games 
        WHERE genre ='` + genre + 
        `' OR players='` + players + 
        `' OR platform='` + platform + 
        `'`;*/
        queryText = `SELECT * FROM games WHERE `
        if(genre!='none') {
            queryText += `genre='` + genre + `'`
            if(players!= 'none' || platform!= 'none'){
                queryText += ` OR `
            }
        }
        if(players!='none'){
            queryText += `players='` + players + `'`
            if(platform!= 'none'){
                queryText += ` OR `
            }
        }
        if(platform != 'none'){
            queryText += `platform='` + platform + `'`
        }    
    } else {        
        queryText = `SELECT * FROM games WHERE `        
        if(genre != 'none') {
            queryText += `genre='` + genre + `'`
            if(players!= 'none' || platform!= 'none'){
                queryText += ` AND `
            }
        }
        if(players!='none'){
            queryText += `players='` + players + `'`
            if(platform!= 'none'){
                queryText += ` AND `
            }
        }
        if(platform != 'none'){
            queryText += `platform='` + platform + `'`
        }
        console.log("Text is: " + queryText);

    /*`SELECT * 
    FROM games 
    WHERE genre ='` + genre + 
    `' AND players='` + players + 
    `' AND platform='` + platform + 
    `'`;*/
    } 

    pool.query(queryText, (err, result) => {        
        if(err){
            return console.error('error in getAdvancedSearchResults', err)
        }            
        res.render('shop/search-results', {
            results: result.rows,
        })
    })
}


// this will go to cart page!!!
exports.getCart = (req, res, next) => {
    //check whether user is login, if not, redirect to login page

    req.user.getCart()
    .then(cart => {
        if(!cart){
           return req.user.createCart();
        }
        return cart;
    })
    .then(cart=>{
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

/**
 * Author: Zequn Jiang
 * Add user's preference to their own cart
 * Each user only has one cart at a time
 */
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

    user.getCart()
        .then(cart=>{
            if(!cart){
                return user.createCart();
            }
            return cart;
        })
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

getAdvancedSearchString = (genre, players, platform) => {

}