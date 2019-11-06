const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.get('/user', userController.getUsers)

router.get('/user/:userID', userController.getUserByID)
router.post('/user', userController.postOneUser)
router.delete('/user/:userID', userController.deleteUserByID)
router.put('/user/:userID', userController.putOneUserByID)



module.exports = router;