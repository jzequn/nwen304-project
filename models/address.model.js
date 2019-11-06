/**
 * Model: address
 * Author: Zequn Jiang
 */
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Address = sequelize.define('address', {
    address_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }  
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, 
{
    timestamps: false
})

module.exports = Address;