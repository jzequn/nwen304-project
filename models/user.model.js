/**
 * Model: user model
 * Author: Zequn Jiang
 */
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: Sequelize.STRING,
    fb_id:{
        type: Sequelize.DECIMAL,
        unique: true
    },
    google_id:{
        type: Sequelize.DECIMAL,
        unique: true
    }
},{
    //disable createdAt and updatedAt timestamp
    timestamps: false
})

module.exports = User;