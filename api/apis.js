const games_api = require('./routes/game')
const carts_api = require('./routes/cart')
const orders_api = require('./routes/order')


const setup_restful_APIs = app =>{



    app.use(games_api)

    app.use(carts_api)

    app.use(orders_api)
}



module.exports = setup_restful_APIs;