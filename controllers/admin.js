// Author: Antony Helsby

require('body-parser');

pool = require('../util/postgres');

// show admin home page
exports.getAdmin = (req, res, next) => {
    res.render('admin/home');
}

// show one user
exports.getUserByID = (req, res, next) => {
    const { InputUserID } = req.query;
    const queryText = 'SELECT * FROM users WHERE id=' + InputUserID;
    pool.query(queryText, (err, result) => {        
        if(err){
            return console.error('error in getUserByID', err)
        }    
        const pageMessage = 'User: ' + result.rows.username;
        res.render('admin/review-user', {
            user: result.rows,
            message: pageMessage
        })
    })
}

// show one order
exports.getOrderByID = (req, res, next) => {
    const message = '';
    this.getOrderByID().then(result =>{
        if(!result){
            message = "Couldn't find any orders."
        }
        res.render('admin/review-orders', {
            orders: result.rows,
            message: message
        })
    })
    /*const { InputOrderID } = req.query;
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
    WHERE o.order_id=` + InputOrderID;
    pool.query(queryText, (err, result) => {
        if(err){
            return console.error('error in getOrderByID', err)
        }        
        const pageMessage = 'Order of ' + result.rows.username;
        res.render('admin/review-orders', {
            orders: result.rows,
            message: pageMessage
        })
    })*/
}

// shows list of orders
exports.getOrderReviewPage = (req, res, next) => {
    const {username, userid, email} = req.query;    
    
    const queryText = 
    `SELECT 
    u.username, 
    o.user_id,
    o.order_id, 
    o.order_date, 
    o.total_price, 
    o.deliv_addr  
    FROM orders AS o 
    JOIN users AS u 
    ON u.id = o.user_id`
    pool.query(queryText, (err, result) => {   
        if(err){
            return console.error('error in getOrderReviewPage', err)
        }        
        const pageMessage = 'Looking at all past orders of ' + result.rows[0].username;   
        res.render('admin/review-orders', {
            orders: result.rows,
            message: pageMessage
        })
    })
}

// shows user with editable fields
exports.getUserPageForEdit = (req, res, next) => {
    const {username, userid, email} = req.query;
    const queryText = 'SELECT * FROM users WHERE id=' + userid;
    pool.query(queryText, (err, result) => {  
        if(err){
            return console.error('error in getUserPageForEdit', err)
        }       
        res.render('admin/edit-details', {
            user: result.rows
        })
    })    
}

// shows order with editable fields
exports.getOrderPageForEdit = (req, res, next) => {        
    const{order_id} = req.query;    
    const queryText = 'SELECT * FROM orders WHERE order_id=' + order_id;
    pool.query(queryText, (err, result) => {  
        if(err){
            return console.error('error in getOrderPageForEdit', err)
        }               
        res.render('admin/edit-details', {
            order: result.rows
        })      
   })
}

// updates user with new details
// current unchanged values are passed in to save checking for empty fields
exports.putUserDetails = (req, res, next) => {
    const {InputNewUserName, InputNewUserID, InputNewUserEmail, CurrentUserID} = req.body;    

     const updateText = `UPDATE users SET username='` +  InputNewUserName + `', ` +
     `id=` + InputNewUserID + `, ` +
     `email='` + InputNewUserEmail +
     `' WHERE id=` + CurrentUserID

     pool.query(updateText, (err, result) => {  
         if(err){
             return console.error('error in putUserDetails update', err)
         }           
    })

    const queryText = 'SELECT * FROM users WHERE id=' + InputNewUserID;
    pool.query(queryText, (err, result) => {        
        if(err){
            return console.error('error in putUserDetails query', err)
        }                    
        res.render('admin/edit-details', {
            user: result.rows
        })        
    })
}

// updates order with new details
// current unchanged values are passed in to save checking for empty fields
// only address and price can be changed as this seems appropriate
exports.putOrderDetails = (req, res, next) => {
    const {InputNewAddress, InputNewOrderDate, InputNewTotalPrice, CurrentOrderID} = req.body;    

     const updateText = `UPDATE orders SET deliv_addr='` +  InputNewAddress + `', ` +     
     `total_price='` + InputNewTotalPrice +
     `' WHERE order_id=` + CurrentOrderID

     pool.query(updateText, (err, result) => {  
         if(err){
             return console.error('error in putOrderDetails update', err)
         }           
    })

    const queryText = 'SELECT * FROM orders WHERE order_id=' + CurrentOrderID;
    pool.query(queryText, (err, result) => {        
        if(err){
            return console.error('error in putOrderDetails query', err)
        }                    
        res.render('admin/edit-details', {
            order: result.rows
        })        
    })
}




