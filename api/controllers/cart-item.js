//  Author: Antony Helsby
pool = require('../../util/postgres');


exports.getCartItems = (req, res, next) => {
queryText = 'SELECT * FROM cart-items';

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to fetch cart-items',
            })
        } else if(!result){
            res.status(404).json({
                message: 'No cart-items found!'
            })
        }
        else{
            res.status(200).json({
                message: 'Fetching cart-items was successful.',
                result: result
            })
        }        
        
    })
}

exports.getCartItemByID = (req, res, next) => {

    const cartItemID  = req.params.cart-itemID;
    const queryText = 
    `SELECT * FROM cart-items WHERE cart_id=` + cartItemID;
    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to fetch cart-item',
            })
        } else if(!result){
            res.status(404).json({
                message: 'No cart-item found!'
            })
        }
        else{
            res.status(200).json({
                message: 'Fetching cart-item was successful.',
                result: result
            })
        }        
        
    })
}

exports.postOneCartItem = (req, res, next) => {

    const { cart_id, user_id, quantity } = req.body;
    const queryText = 
    `INSERT INTO orders(cart_id, user_id, quantity) VALUES(` + cart_id + `, ` + user_id + `, ` +  quantity + `)`
    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to post cart-item',
            })
        } 
        else {
            res.status(201).json({
                message: 'Posting cart-item was successful.',
                result: result
            })
        }        
        
    })
}

exports.deleteCartItemByID = (req, res, next) => {

    const cartItemID = req.params.cart-itemID;
    const queryText = `SELECT * FROM cart-items WHERE id = ` + cart-itemID;
    const deleteText = `DELETE FROM cart-items WHERE id = ` + cart-itemID;

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to find cart-item',
            })
        } 
        else if (!result) {
            res.status(404).json({
                message: 'No cart-item found!'
            })
        } else {
            pool.query(deleteText, (err, result) => {
                if(err){                    
                    res.status(500).json({
                        message: 'Failed to delete cart-item',
                    })
                } 
                else {
                    res.status(200).json({
                        message: 'Deleting cart-item was successful.',
                        result: result
                    })
                }        
                
            })
        }       
        
    })    
}

exports.putOneCartItemByID = (req, res, next) => {
    const cartItemID  = req.params.cart-itemID;
    const { cart_id, user_id, quantity } = req.body;   
    const queryText = `SELECT * FROM cart-items WHERE id = ` + cartItemID;
    const updateText = `UPDATE cart-items SET cart_id=` + cart_id +  `, user_id=` + user_id +  `, quantity=` + quantity + ` WHERE id = ` + cartItemID;

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to complete cart-item',
            })
        } 
        else if (!result) {
            res.status(404).json({
                message: 'No cart-item found!'
            })
        } else {
            pool.query(updateText, (err, result) => {
                if(err){                    
                    res.status(500).json({
                        message: 'Failed to update cart-item',
                    })
                } 
                else {
                    res.status(200).json({
                        message: 'Updating cart-item was successful.',
                        result: result
                    })
                }        
                
            })
        }       
        
    })    
}