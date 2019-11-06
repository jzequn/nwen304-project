<<<<<<< HEAD
/**
 * Module: user route (restful api)
 * Author: Zequn Jiang
 */
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

/**
 * user list
 * Author: Zequn Jiang
 */
// router.get('/users',userController.getusers)

/**
 * One user
 * Method: get,post,put,delete
 * Author: Zequn Jiang
 */
router.get('/user/:userId',userController.getUserById)
// router.post('/user',userController.postOneuser)
// router.put('/user/:userId',userController.putuserById)
router.delete('/user/:userId',userController.deleteUserById)
=======
const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.get('/order', orderController.getUsers)

router.get('/order/:orderID', orderController.getUserByID)
router.post('/order', orderController.postOneUser)
router.delete('/order/:orderID', orderController.deleteUserByID)
router.put('/order/:orderID', orderController.putOneUserByID)


>>>>>>> Antony

module.exports = router;