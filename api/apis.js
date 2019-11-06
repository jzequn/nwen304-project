/**
 * Module: restful api routes
 * Combine all the api routes in one file
 * Author: Zequn Jiang
 */
const games_api = require('./routes/game')
const carts_api = require('./routes/cart')
const orders_api = require('./routes/order')

/**
 * Combine all the api routes in one method
 * @param {*} app 
 * Author: Zequn Jiang
 */
const setup_restful_APIs = app =>{
    app.use(games_api)
    app.use(carts_api)

    app.use(orders_api)
}

module.exports = setup_restful_APIs;