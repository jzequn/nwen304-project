const User = require('../../models/user.model')
/**
 * Get a game by primary key - id, from postgreSQL database
 * Author: Zequn Jiang
 */


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

exports.getUserById = (req, res, next) => {
    userID = req.params.userID;    
    const queryText = 
    `SELECT * FROM users WHERE user_id=`+ userID;
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

    const { username, email, password, fb_id, google_id } = req.body;
    const queryText = 
    `INSERT INTO
    users(username, email, password, fb_id, google_id ) 
    VALUES('` + username + `', '` + email + `', '` + password + `', ` + fb_id + `, ` + google_id + `);`
    pool.query(queryText, (err, result) => {
        if(err){            
            res.status(500).json({
                message: 'Failed to post user',
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

    const userID = req.params.userID;   
    const queryText = `SELECT * FROM users WHERE user_id = ` + userID;
    const deleteText = `DELETE FROM users WHERE user_id = ` + userID;

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
                        message: 'Failed to delete user',
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
    const userID = req.params.userID;   
    const { username, email, password, fb_id, google_id } = req.body;
    const queryText = `SELECT * FROM users WHERE user_id = ` + userID;
    const updateText = `UPDATE users SET username='` + username +  `', email='` + email + `', password='` + password +  `', fb_id=` + fb_id + `, google_id=` + google_id +  ` WHERE user_id = ` + userID;

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









/*exports.getUserById = (req, res, next) => {
    const {userId} = req.params;
    User.findByPk(userId)
        .then(user=> {
            if (!user) {
                // console.log('no games found!')
                res.status(404).json({
                    message: 'No user found!'
                })
                // next()
            }else{
                // console.log('found one game!')
                res.status(200).json({
                    message: 'Fetch user successfully',
        
                    user:user
                })
            }

        })
        .catch(err => {
            // console.log('500 error!')
            res.status(500).json({
                message: 'Fetch user fail!',
            })
        })
}

exports.deleteUserById = (req,res,next) =>{
    const {id} = req.user;
    User.findByPk(id)
        .then(user=> {
            if (!user) {
                // console.log('no games found!')
                res.status(404).json({
                    message: 'No user found!'
                })
                // next()
            }else{
                // console.log('found one game!')
                user.destroy();
                res.status(200).json({
                    message: 'delet user successfully',
        
                    user:user
                })
            }

        })
        .catch(err => {
            // console.log('500 error!')
            res.status(500).json({
                message: 'delete user fail!',
            })
        })

}*/
