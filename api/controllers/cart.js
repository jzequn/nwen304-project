/**
 * Module: Cart controller
 * Author: Zequn Jiang
 */
const Cart = require('../../models/cart.model')

/**
 * Get cart list
 * Author: Zequn Jiang
 */
exports.getCarts = (req, res, next) => {
    Cart.findAll()
        .then(carts => {
            if (!carts) {
                // if no cart is found
                res.status(404).json({
                    message: "No Carts found!"
                })
            } else {
                // if cart list is found
                res.status(200).json({
                    message: 'Fetched Carts sucessfully',
                    carts: carts
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Fetched Carts failed'
            })
        })
}