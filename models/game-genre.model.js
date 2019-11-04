const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GameGenre = sequelize.define('gameGenre', {
    genre_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    game_id: {
        type: Sequelize.STRING,
    }
})

module.exports = GameGenre;