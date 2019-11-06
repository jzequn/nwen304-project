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

/**
 * Get cart list
 * Author: Zequn Jiang
 */
exports.getCartById = (req,res,next)=>{

    const {cartId} = req.params;
    Cart.findByPk(cartId)
    .then(cart=>{
        if (!cart) {
            res.status(404).json({
                message: `No cart found with cartId:${cartId}!`
            })
        } else {
            res.status(200).json({
                message: 'Fetch cart successfully',
                cart:cart
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message: 'Fetch cart by id fail!',
        })
    })
}

/**
 * Get cart list
 * Author: Zequn Jiang
 */
exports.postCartById =(req,res,next)=>{

    
}