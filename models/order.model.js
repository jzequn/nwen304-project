const Sequelize = require('sequelize');
const sequelize = require('../util/database');
//const User = require('user.model');
//const Address = require('/address.model');

const Order = sequelize.define('orders', {
    order_id: {
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
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'address',
            key: 'address_id'
        } 
    },
    order_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    
}, 
{
    timestamps: false
})

module.exports = Order;