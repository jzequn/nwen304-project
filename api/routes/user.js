const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.get('/order', orderController.getUsers)

router.get('/order/:orderID', orderController.getUserByID)
router.post('/order', orderController.postOneUser)
router.delete('/order/:orderID', orderController.deleteUserByID)
router.put('/order/:orderID', orderController.putOneUserByID)



module.exports = router;