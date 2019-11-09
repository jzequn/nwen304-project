/**
 * Author: Zequn Jiang
 * render shop and cart page
 */
const path = require('path');
const Game = require('../models/game.model');
Sequelize = require('sequelize');
pool = require('../util/postgres');

/**
 * Author: Zequn Jiang
 * render index page, which is the shop page
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

/**
 * Author: Zequn Jiang
 * render cart page
 */
exports.getCart = (req, res, next) => {
    //check whether user is login, if not, redirect to login page
    const userId = req.user.id;
    console.log('user_id:', req.user.id);
    const queryString_getCart = `
        select * from cart where user_id = ${userId}
    `;
    pool.query(queryString_getCart)
        .then(result => {
            if (result.rows.length <= 0) {
                // user does not have a cart,create one
                const queryString_insertCart = `
               insert into cart (user_id)
               values (${userId})
           `;
                pool.query(queryString_insertCart)
                    .then(result => {
                        //    console.log('result-cart',result);
                        //    res.render("shop/cart", {
                        //        products: cartGames,
                        //    });
                        res.redirect('/shop/cart');
                    })
            } else {
                //user has a cart. render cart item
                console.log('join tables')
                // const queryString_getCartItem = `
                //     select
                //     from cart
                //     inner join cart_item
                //     where cart.user_id = ${userId}
                // `
                const queryString_getCartItem = `
                    select cart.id, cart_item.game_id
                    from cart
                    inner join cart_item
                    on cart.id=cart_item.cart_id
                    where cart.user_id = ${userId}
               `;
                pool.query(queryString_getCartItem)
                    .then(result => {
                        // error handling, if no cart_item associated with cart, display render nothing!
                        if (result.rows.length > 0) {
                            const queryStringTest = `
                                select 
                                    cart.id, cart.user_id, cart_item.id,cart_item.quantity, cart_item.game_id, games.price,games.title
                                from 
                                    cart, cart_item,games
                                where cart.id = cart_item.cart_id and cart_item.game_id = games.game_id and cart.user_id = ${userId}
                            `;
                            pool.query(queryStringTest)
                                .then(result => {
                                    console.log('join tables123')
                                    console.log('result,', result.rows)
                                    const { id, user_id, quantity, game_id, price, title } = result.rows;
                                    console.log('price1', result.rows[0].price)
                                    res.render("shop/cart", {
                                        products: result.rows
                                    });
                                })
                                .catch(err => {
                                    console.log('error testing!')
                                })
                        } else {
                            res.render("shop/cart", {
                                products: {}
                            });
                        }

                    })

            }
        })
    // req.user.getCart()
    // .then(cart => {
    //     if(!cart){
    //        return req.user.createCart();
    //     }
    //     return cart;
    // })
    // .then(cart=>{
    //     return cart.getGames()
    //     .then(cartGames => {
    //       res.render("shop/cart", {
    //         products: cartGames,
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // })
    // .catch(err => {
    //   console.log(err);
    // })
}

/**
 * Author: Zequn Jiang
 * Add user's preference to their own cart
 * Each user only has one cart at a time
 */
exports.addToCart = (req, res, next) => {
    //console.log('add-to-cart, req.body', req.body);
    const { game_id } = req.body;
    const userId = req.user.id;
    console.log('user_id:', req.user.id);
    const queryString_getCart = `
        select * from cart where user_id = ${userId}
    `;
    pool.query(queryString_getCart)
        .then(result => {
            if (result.rows.length <= 0) {
                // user does not have a cart,create one
                const queryString_insertCart = `
               insert into cart (user_id)
               values (${userId})
           `;
                pool.query(queryString_insertCart)
                    .then(result => {
                        //    console.log('result-cart',result);
                        //    res.render("shop/cart", {
                        //        products: cartGames,
                        //    });
                        res.redirect('/shop/cart');
                    })
            } else {
                // //get cart_id
                // pool.query(queryString_getCart)
                // .then(result=>{

                //     const {id} = result.rows;
                //     console.log('user id test',id);
                // })
                //check if cart_item has this game
                const queryString_getItemFromCart_item = `
                select 
                    c.user_id,ci.id as cart_item_id, ci.quantity, ci.cart_id, ci.game_id
                from 
                    cart as c, cart_item as ci
                where ci.game_id = ${game_id} and c.user_id = ${req.user.id} and c.id = ci.cart_id;
                `
                pool.query(queryString_getItemFromCart_item)
                    .then(result => {
                        if (result.rows.length > 0) {
                            // if yes, update quantity of cart_item where game_id = game_id
                            const {cart_item_id,quantity,cart_id,game_id} = result.rows[0];
                            console.log('result cart_item_row', result.rows);
                            const queryString_update = `
                                update cart_item
                                    set quantity = ${quantity+1}, cart_id = ${cart_id}, game_id = ${game_id}
                                where cart_item.id = ${cart_item_id}
                            `
                            pool.query(queryString_update)
                            .then(result=>{
                                res.redirect('/shop/cart');
                            })
                            .catch(err=>{
                                console.log('query err, update cart_item fail',err);
                            })
                        } else {
                            // if no, insert quantity, cart_id, game_id into cart_item
                            pool.query(queryString_getCart)
                            .then(result=>{
                                const cart_id = result.rows[0].id;
                                const queryString_insertCart_item = `
                                insert into cart_item (quantity,cart_id,game_id)
                                values (1,  ${cart_id},  ${game_id})
                                `
                                pool.query(queryString_insertCart_item)
                                .then(result=>{
                                    res.redirect('/shop/cart');
                                })
                                .catch(err=>{
                                    console.log('query err, insert into cart_item fail',err);
                                })
                            })
                            .catch(err=>{
                                console.log('get cart error');
                                res.redirect('/');
                            })

                        }
                    })
            }
        }
        ).catch(err => {
            console.log(err)
            res.redirect('/');
        })


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
    // let fetchedCart;
    // let newQuantity = 1;

    // const user = req.user;

    // user.getCart()
    //     .then(cart => {
    //         if (!cart) {
    //             return user.createCart();
    //         }
    //         return cart;
    //     })
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getGames({ where: { game_id: game_id } })
    //     })
    //     .then(games => {
    //         let game;
    //         if (games.length > 0) {
    //             game = games[0];
    //         }
    //         if (game) {
    //             const oldQuantity = game.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return game;
    //         }
    //         return Game.findByPk(game_id);
    //     })
    //     .then(game => {
    //         return fetchedCart.addGame(game, {
    //             through: { quantity: newQuantity }
    //         })
    //     })
    //     .then(() => {
    //         res.redirect('/shop/cart');
    //     })
}