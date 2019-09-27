const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Item = sequelize.define('item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
});

module.exports = Item;