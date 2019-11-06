/**
 * Model: cart-item model
 * Author: Zequn Jiang
 */
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
<<<<<<< HEAD
},
{
=======
}, {
>>>>>>> Antony
    timestamps: false
})
module.exports = CartItem;