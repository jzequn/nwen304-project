/**
 * Model: genres
 * Author: Zequn Jiang
 */
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Genre = sequelize.define('genre', {
    genre_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    genre: {
        type: Sequelize.STRING
    }
})

module.exports = Genre;