const User = require('../../models/user.model')
/**
 * Get a game by primary key - id, from postgreSQL database
 * Author: Zequn Jiang
 */
exports.getUserById = (req, res, next) => {
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

}
