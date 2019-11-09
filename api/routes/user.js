/**
 * Module: user route (restful api)
 * Author: Antony Helsby and Zequn Jiang 
 */
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

/**
 * user list
 * Author: Zequn Jiang
 */
router.get('/user',userController.getusers)

/**
 * One user
 * Method: get,post,put,delete
 * Author: Antony Helsby and Zequn Jiang
 */
router.get('/user/:userID',userController.getUserById)
router.post('/user',userController.postOneuser)
router.put('/user/:userID',userController.putuserById)
router.delete('/user/:userID',userController.deleteUserById)

module.exports = router;