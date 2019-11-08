/**
 * Author: Zequn Jiang
 * this will go to cart page!!!
 */
const path = require('path');
const Game = require('../models/game.model');
Sequelize = require('sequelize');
pool = require('../util/postgres');

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
        if (err) {
            return console.error('error in getGamesByGenre', err)
        }
        res.render('shop/shop-item', {
            game: result.rows,
        })
    })
}

// Author of getSearch: Antony Helsby
exports.getSearch = (req, res, next) => {        
    let search = req.param('search');    
    searchQuery = "SELECT * FROM games WHERE title ILIKE " + "'%" + search + "%'"   

    pool.query(searchQuery)
    .then(results => {
        res.render('shop/search-results', {
            results: results.rows
        })
    })
}

// Author of getGamesByGenre: Antony Helsby
exports.getGamesByGenre = (req, res, next) => {
    let genre = req.params.genre
    queryText = "SELECT * FROM games WHERE genre = '" + genre + "'";

    pool.query(queryText, (err, result) => {
        if (err) {
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
    const { genre, players, platform, requireAllSelections } = req.query

    let queryText = '';
    if (requireAllSelections == undefined) {

        queryText = `SELECT * FROM games WHERE `
        queryText += getAdvancedSearchOR(genre, players, platform)
    } else {
        queryText = `SELECT * FROM games WHERE `
        queryText += getAdvancedSearchAND(genre, players, platform)        
    }
    
    pool.query(queryText, (err, result) => {
        if (err) {
            return console.error('error in getAdvancedSearchResults', err)
        }
        res.render('shop/search-results', {
            results: result.rows,
        })
    })
}

// use in getAdvancedSearch for OR search (checkbox not ticked to contain all selections)
getAdvancedSearchOR = (genre, players, platform) => {
    let queryText = ""
    if (genre != 'none') {
        queryText += `genre='` + genre + `'`
        if (players != 'none' || platform != 'none') {
            queryText += ` OR `
        }
    }
    if (players != 'none') {
        queryText += `players='` + players + `'`
        if (platform != 'none') {
            queryText += ` OR `
        }
    }
    if (platform != 'none') {
        queryText += `platform='` + platform + `'`
    }
    return queryText
}

// use in getAdvancedSearch for AND search (checkbox is ticked to contain all selections)
getAdvancedSearchAND = (genre, players, platform) => {
    let queryText = ""
    if (genre != 'none') {
        queryText += `genre='` + genre + `'`
        if (players != 'none' || platform != 'none') {
            queryText += ` AND `
        }
    }
    if (players != 'none') {
        queryText += `players='` + players + `'`
        if (platform != 'none') {
            queryText += ` AND `
        }
    }
    if (platform != 'none') {
        queryText += `platform='` + platform + `'`
    }
    return queryText
}

// this will go to cart page!!!
exports.getCart = (req, res, next) => {
    //check whether user is login, if not, redirect to login page

    req.user.getCart()
        .then(cart => {
            if (!cart) {
                return req.user.createCart();
            }
            return cart;
        })
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

/**
 * Author: Zequn Jiang
 * Add user's preference to their own cart
 * Each user only has one cart at a time
 */
exports.addToCart = (req, res, next) => {
    //console.log('add-to-cart, req.body', req.body);
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
        .then(cart => {
            if (!cart) {
                return user.createCart();
            }
            return cart;
        })
        .then(cart => {
            fetchedCart = cart;
            return cart.getGames({ where: { game_id: game_id } })
        })
        .then(games => {
            let game;
            if (games.length > 0) {
                game = games[0];
            }
            if (game) {
                const oldQuantity = game.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return game;
            }
            return Game.findByPk(game_id);
        })
        .then(game => {
            return fetchedCart.addGame(game, {
                through: { quantity: newQuantity }
            })
        })
        .then(() => {
            res.redirect('/shop/cart');
        })
}

exports.testAddToCart = (req, res, next) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(`
    
    
    
    
    
    
    The body is: ` + req.body);
    console.log('The req.body.game_id is: ' + JSON.stringify(req.body.game_id));
    console.log('The req.user.username is: ' + req.user.username);
    const num = req.user.user_id
    checkForTestCart = `SELECT * FROM testcarts WHERE user_id=` + req.user.id;
    createTestCart = `INSERT INTO testcarts(user_id) VALUES(` + req.user.id + `)`;
    checkForTestGame = `SELECT * FROM games WHERE game_id=` + req.body.game_id;
    var getTestCart = `SELECT * FROM testcarts WHERE user_id=` + req.user.id;


    var usid =  req.user.user_id;
    var gmid = req.body.game_id;
    

    //const num = req.user.user_id
    //getTestCart = `SELECT * FROM testcarts WHERE user_id=` + num;

    var createdCart
    var fetchedCart;
    var newQuantity = 1;
    var cart;
    queries = [{getTestCart}]

    pool.query(checkForTestCart)
        .then(testCart => {
            
            if (typeof testCart.rows[0] === 'undefined') {                   
                    console.log("createTestCart: " + createTestCart);
                    pool.query(createTestCart).then(created => {
                                                                           
                    })    
                    .catch(err => {
                        return console.error(err);
                    });                                   
                    //return createdCart;
            }else{
                return testCart
            }
            return testCart
            
        }).then(testCart =>{
            if (typeof testCart.rows[0] === 'undefined') {  
                console.log("get Tests cart: " + getTestCart);
                return pool.query(getTestCart)/*.then(testsCart =>{
                    console.log('in get');      
                    console.log('testsCart: ' + testsCart);
                    console.log('testsCart.rows is: ' + testsCart.rows);
                    console.log('testsCart.rows[0] is: ' + testsCart.rows[0]);    
                    return testsCart.rows
                    
                }).catch(err => {        
                    console.log('uh uh  it happened here');                    
                    return console.error(err);
                })*/
            }
            console.log("expect to gt here??");
            return testCart   
        })
        .then(cart => {
            console.log('the cart.rows[0].cart_id is: ' + cart.rows[0].cart_id);
            fetchedCart = cart
            /*console.log('fetched cart is: ' + fetchedCart);
            console.log('fetchedCart.rows is: ' + fetchedCart.rows);
            console.log('fetchedCart.rows[0] is: ' + fetchedCart.rows[0]);*/
            console.log("fetchedCart.rows[0].cart_id ===== " + fetchedCart.rows[0].cart_id);            
            ran = pool.query(`SELECT * FROM testcartitems WHERE cart_id=` + fetchedCart.rows[0].cart_id)            
            return ran;
        })
        .then(cartItem => {
            console.log(JSON.toString(cartItem));
            console.log("got here");
            let item;
            if (cartItem.length > 0) {
                item = carItem.rows[0];
            }
            if (item) {
                const oldQuantity = item.quantity;
                newQuantity = oldQuantity + 1;
                return item;
            
            }
            //console.log("cartItem " + cartItem.game_id);
            //console.log("cartItem[0] " + cartItem[0].game_id);
            console.log("cartItem.game_id is " + cartItem.game_id);
            console.log("cartItem.rows is " + cartItem.rows.game_id);
            // console.log("cartItem.rows[0] is " + cartItem.rows[0].game_id);
            console.log("LOL THIS WAS FUCKIN IT " + gmid);
            
            return pool.query(`SELECT * FROM games WHERE game_id=` + gmid);
        })
        .then(game => {     
            // how do i get the 
            //var cart = getCartById(usid);    
            console.log("usid is: " + usid);
            pool.query('SELECT * FROM testcarts WHERE user_id=' + usid).then(cart => {
                console.log("carrrrrrr is " + cart);
                console.log("faulty string is : " + `INSERT INTO testcartitems(cart_id, game_id, quantity) VALUES(`+ cart + `,` + gmid/*fetchedCart.game_id*/ +`, ` + newQuantity +`)`);
                return pool.query(`INSERT INTO testcartitems(cart_id, game_id, quantity) VALUES(`+ cart + `,` + gmid/*fetchedCart.game_id*/ +`, ` + newQuantity +`)`)
            }).catch(err => {
                return console.error(err);
            }); 
            
            console.log("carrrrrrr is " + cart);
            console.log("faulty string is : " + `INSERT INTO testcartitems(cart_id, game_id, quantity) VALUES(`+ cart + `,` + gmid/*fetchedCart.game_id*/ +`, ` + newQuantity +`)`);
            //return pool.query(`INSERT INTO testcartitems(cart_id, game_id, quantity) VALUES(`+ cart + `,` + gmid/*fetchedCart.game_id*/ +`, ` + newQuantity +`)`)
        })
        .then(() => {
            res.redirect('/shop/cart');
        })
        .catch(err => {
            return console.error(err);
        });

    /*pool.query(createTestCart, (err, result) => {
        if (err) {
            if (err.code == 23505) {
                console.log("Is key error!");
                pool.query(`INSERT INTO testcarts(user_id) VALUES(1)`, (err, result) => {
                    return console.error('INNER ERROR!!!!!!!!!!!!!!!!', err)
                })
            }
            return console.error('error in getGamesByGenre', err)
        }
        res.redirect('/shop/cart');
    })*/
}

getCartById = (id) => {
    console.log("method");
    pool.query('SELECT * FROM testcarts WHERE user_id=' + id).then(cart => {
        console("in method " + cart.rows[0].cart_id);
        console.log("carrrrrrr is " + cart);
    }).catch(err => {
        return console.error(err);
    }); 
}

getAdvancedSearchString = (genre, players, platform) => {

}