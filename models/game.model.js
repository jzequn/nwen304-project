/**
 * Model: game
 * Author: Zequn Jiang
 */
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Game = sequelize.define('games', {
    game_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: Sequelize.DECIMAL(4,2),
    description: Sequelize.STRING,    
    num_in_stock: Sequelize.INTEGER,
    genre:Sequelize.STRING,
    players:Sequelize.STRING,
    platform:Sequelize.STRING
}, {
    timestamps: false
})

module.exports = Game;