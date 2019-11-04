const Cart = require('../../models/cart.model')

exports.getCarts = (req,res,next)=>{

    Cart.findAll()
    .then(carts=>{
        if(!carts){
            res.status(404).json({
                message:"No Carts found!"
            })
            next()
        }
        res.status(200).json({
            message:'Fetched Carts sucessfully',
            carts: carts
        })
    })
    .catch(err=>{
        throw err;
    })
}