/**
 * Module: Cart controller
 * Author: Zequn Jiang
 */
const Cart = require('../../models/cart.model')
const pool = require('../../util/postgres');
/**
 * Get cart list
 * Author: Zequn Jiang
 */
exports.getCarts = (req, res, next) => {
    const queryString_getCart = `
        select * from cart
    `;
    pool.query(queryString_getCart)
        .then(result => {
            if (result.rows.length > 0) {
                res.status(200).json({
                    message: 'Get carts successfully',
                    carts: result.rows
                })
            } else {
                res.status(404).json({
                    message: 'No cart found!'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'delete user fail!',
            })

        })
    // Cart.findAll()
    //     .then(carts => {
    //         if (!carts) {
    //             // if no cart is found
    //             res.status(404).json({
    //                 message: "No Carts found!"
    //             })
    //         } else {
    //             // if cart list is found
    //             res.status(200).json({
    //                 message: 'Fetched Carts sucessfully',
    //                 carts: carts
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             message: 'Fetched Carts failed'
    //         })
    //     })
}

/**
 * Get cart by id
 * Author: Zequn Jiang
 */
exports.getCartById = (req, res, next) => {

    const { cartId } = req.params;
    const queryString_getCartById = `
        select * from cart where id = ${cartId}
    `;
    pool.query(queryString_getCartById)
        .then(result => {
            if (result.rows.length > 0) {
                res.status(200).json({
                    message: 'Get cart by id successfully',
                    carts: result.rows
                })
            } else {
                res.status(404).json({
                    message: 'No cart by this id found!'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get cart by id fail!',
            })

        })
    // Cart.findByPk(cartId)
    // .then(cart=>{
    //     if (!cart) {
    //         res.status(404).json({
    //             message: `No cart found with cartId:${cartId}!`
    //         })
    //     } else {
    //         res.status(200).json({
    //             message: 'Fetch cart successfully',
    //             cart:cart
    //         })
    //     }

    // })
    // .catch(err=>{
    //     res.status(500).json({
    //         message: 'Fetch cart by id fail!',
    //     })
    // })
}

/**
 * post a cart
 * Author: Zequn Jiang
 */
exports.postCart = (req, res, next) => {
    const { user_id } = req.body;
    const queryString = `
        insert into cart (user_id) values (${user_id})
    `
    //check if this user_id exist, if exist, don't need to post it
    const queryString_findCartByUserId = `
        select * from cart where user_id = ${user_id}
    `;
    pool.query(queryString_findCartByUserId)
        .then(result => {
            if (result.rows.length > 0) {
                res.status(400).json({
                    message: 'Cart with this user_id already exist!'
                })
            } else {
                //if cart with this user_id do not exist, post it
                pool.query(queryString)
                    .then(result => {
                        res.status(201).json({
                            message: 'Post cart successfully'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Post cart fail!',
                        })
                    })
            }

        })
        .catch(err => {
            res.status(500).json({
                message: 'Post cart fail!',
            })
        })

}

/**
 * delete a cart by id
 * Author: Zequn Jiang
 */
exports.deleteCartById = (req, res, next) => {
    const { cartId } = req.params;
    const queryString_deleteCartById = `
        delete from cart where cart.id = ${cartId}
    `;

    const queryString_findCartById = `
        select * from cart 
        where id = ${cartId}
    `;
    pool.query(queryString_findCartById)
        .then(result => {
            if (result.rows.length > 0) {
                pool.query(queryString_deleteCartById)
                    .then(result => {
                        res.status(200).json({
                            message: 'Delete cart by id successfully',
                            cart_id: cartId
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Delete cart by id fail!',
                        })
                    })
            } else {
                res.status(404).json({
                    message: 'Cart with this id:' + cartId + ' doesn\'t exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Delete cart by id fail!',
            })
        })

}



/**
 * put a cart
 * Author: Zequn Jiang
 */
exports.putCartById = (req, res, next) => {
    const { cartId } = req.params;
    const { user_id } = req.body;

    //check if cart exist 
    const queryString_findCartById = `
        select * from cart 
        where id = ${cartId}
    `

    //update cart user_id
    const queryString_putCartById = `
        update cart 
        set user_id = ${user_id}
        where cart.id = ${cartId}
    `;
    //post cart user_id

    pool.query(queryString_findCartById)
        .then(result => {
            if (result.rows.length > 0) {
                //if cart with this id exist, update its user_id
                pool.query(queryString_putCartById)
                    .then(result => {
                        res.status(200).json({
                            message: 'Update cart by id successfully',
                            cart_id: cartId
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Update cart fail!',
                        })
                    })
            } else {
                //if cart with this id do not exist, create a cart with this user_id
                const queryString_postCart = `
                    insert into cart (user_id) values (${user_id})
                `
                pool.query(queryString_postCart)
                    .then(result => {
                        res.status(201).json({
                            message: 'Can\'t find this cart, post cart successfully'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'Can\'t find this cart, post cart fail!',
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Put cart fail!',
            })
        })

}