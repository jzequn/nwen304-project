const path = require('path');
const Game = require('../models/game.model');
Sequelize = require('sequelize');

exports.getIndex = (req, res, next) => {
    // res.render('../Online_Shopping/index.html');
    // res.sendFile('../Online_Shopping/index.html');
    // res.sendFile(path.join(__dirname,'../Online_Shopping/index.html'))
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
                [Op.iLike]: search
            }
        } 
    }).then(results =>{
        console.log(results)
        res.render('shop/search-results', {
            results: results
        }) 
    })        
}

exports.addToCart = (req, res, next) => {
    res.render('shop/cart');
}