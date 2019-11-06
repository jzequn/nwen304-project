pool = require('../../util/postgres');


exports.getOrders = (req, res, next) => {
queryText = 'SELECT * FROM orders';

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to fetch orders',
            })
        } else if(!result){
            res.status(404).json({
                message: 'No orders found!'
            })
        }
        else{
            res.status(200).json({
                message: 'Fetching orders was successful.',
                result: result
            })
        }        
        
    })
}

exports.getOrderByID = (req, res, next) => {

    const orderID  = req.params.orderID;
    const queryText = 
    `SELECT
    u.username, 
    o.user_id,
    o.order_id, 
    o.order_date, 
    o.total_price, 
    o.deliv_addr 
    FROM 
    orders AS o 
    JOIN users AS u 
    ON u.id = o.user_id
    WHERE o.order_id=` + orderID;
    pool.query(queryText, (err, result) => {
        if(err){
            console.error('error in getOrderByID', err)
            res.status(500).json({
                message: 'Failed to fetch order',
            })
        } else if(!result){
            res.status(404).json({
                message: 'No order found!'
            })
        }
        else{
            res.status(200).json({
                message: 'Fetching order was successful.',
                result: result
            })
        }        
        
    })
}

exports.postOneOrder = (req, res, next) => {

    const { user_id, order_date, total_price, deliv_addr } = req.body;
    const queryText = 
    `INSERT INTO
    orders(user_id, order_date, total_price, deliv_addr) 
    VALUES(` + user_id + `, '` + order_date + `', ` + total_price + `, '` + deliv_addr + `');`
    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to post order',
            })
        } 
        else {
            res.status(201).json({
                message: 'Posting order was successful.',
                result: result
            })
        }        
        
    })
}

exports.deleteOrderByID = (req, res, next) => {

    const orderID = req.params.orderID;
    const queryText = `SELECT * FROM orders WHERE order_id = ` + orderID;
    const deleteText = `DELETE FROM orders WHERE order_id = ` + orderID;

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to find order',
            })
        } 
        else if (!result) {
            res.status(404).json({
                message: 'No order found!'
            })
        } else {
            pool.query(deleteText, (err, result) => {
                if(err){                    
                    res.status(500).json({
                        message: 'Failed to delete order',
                    })
                } 
                else {
                    res.status(200).json({
                        message: 'Deleting order was successful.',
                        result: result
                    })
                }        
                
            })
        }       
        
    })    
}

exports.putOneOrderByID = (req, res, next) => {
    const orderID  = req.params.orderID;
    const { user_id, order_date, total_price, deliv_addr } = req.body;    
    const queryText = `SELECT * FROM orders WHERE order_id = ` + orderID;
    const updateText = `UPDATE orders SET user_id=` + user_id +  `, order_date='` + order_date + `', total_price=` + total_price +  `, deliv_addr='` + deliv_addr +  `' WHERE order_id = ` + orderID;

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to complete query',
            })
        } 
        else if (!result) {
            res.status(404).json({
                message: 'No order found!'
            })
        } else {
            pool.query(updateText, (err, result) => {
                if(err){                    
                    res.status(500).json({
                        message: 'Failed to update order',
                    })
                } 
                else {
                    res.status(200).json({
                        message: 'Updating order was successful.',
                        result: result
                    })
                }        
                
            })
        }       
        
    })    
}