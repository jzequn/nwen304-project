const games_api = require('./routes/game')
const carts_api = require('./routes/cart')


const setup_restful_APIs = app =>{



    app.use(games_api)

    app.use(carts_api)
}



module.exports = setup_restful_APIs;