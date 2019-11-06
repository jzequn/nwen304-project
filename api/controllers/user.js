pool = require('../../util/postgres');


exports.getUsers = (req, res, next) => {
queryText = 'SELECT * FROM users';

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to fetch users',
            })
        } else if(!result){
            res.status(404).json({
                message: 'No users found!'
            })
        }
        else{
            res.status(200).json({
                message: 'Fetching users was successful.',
                result: result
            })
        }        
        
    })
}

exports.getUserByID = (req, res, next) => {

    const userID  = req.params.userID;
    const queryText = `SELECT * FROM users WHERE id=` + userID;
    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to fetch user',
            })
        } else if(!result){
            res.status(404).json({
                message: 'No user found!'
            })
        }
        else{
            res.status(200).json({
                message: 'Fetching user was successful.',
                result: result
            })
        }        
        
    })
}

exports.postOneUser = (req, res, next) => {

    const {username, email, password } = req.body;
    const queryText = 
    `INSERT INTO
    users(username, email, password) 
    VALUES('` + username + `', '` + email + `', '` + password + `');`
    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to post order',
            })
        } 
        else {
            res.status(201).json({
                message: 'Posting user was successful.',
                result: result
            })
        }        
        
    })
}

exports.deleteUserByID = (req, res, next) => {

    const orderID = req.params.orderID;
    const queryText = `SELECT * FROM users WHERE id = ` + userID;
    const deleteText = `DELETE FROM users WHERE id = ` + userID;

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to find user',
            })
        } 
        else if (!result) {
            res.status(404).json({
                message: 'No user found!'
            })
        } else {
            pool.query(deleteText, (err, result) => {
                if(err){                    
                    res.status(500).json({
                        message: 'Failed to user order',
                    })
                } 
                else {
                    res.status(200).json({
                        message: 'Deleting user was successful.',
                        result: result
                    })
                }        
                
            })
        }       
        
    })    
}

exports.putOneUserByID = (req, res, next) => {
    const orderID  = req.params.orderID;
    const { username, email, password } = req.body;    
    const queryText = `SELECT * FROM users WHERE order_id = ` + userID;
    const updateText = `UPDATE users SET username='` + username +  `', email='` + email + `', password='` + password + `' WHERE id = ` + userID;

    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to complete query',
            })
        } 
        else if (!result) {
            res.status(404).json({
                message: 'No user found!'
            })
        } else {
            pool.query(updateText, (err, result) => {
                if(err){                    
                    res.status(500).json({
                        message: 'Failed to update user',
                    })
                } 
                else {
                    res.status(200).json({
                        message: 'Updating user was successful.',
                        result: result
                    })
                }        
                
            })
        }       
        
    })    
}