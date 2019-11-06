/**
 * Model: game_genres model
 * Author: Zequn Jiang
 */
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

/**
 * table name: game_genres
 */
const GameGenre = sequelize.define('game_genres', {
    genre_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    game_id: {
        type: Sequelize.INTEGER,
    }
},{
    //disable createdAt and updatedAt timestamp
    timestamps: false
}
)

module.exports = GameGenre;