const express = require('express');
// const { check, validationResult } = require('express-validator');
router = express.Router();

const {ensureAuthenticated}= require('../util/auth')
const userController = require('../controllers/user');

// router.post('/users', [
//     // username must be an email
//     check('username').isEmail(),
//     // password must be at least 5 chars long
//     check('password').isLength({ min: 5 })
// ], userController.postUser);

router.get('/users/register', userController.getRegister)
router.post('/users/register', userController.postRegister)
router.get('/users/login', userController.getLogin)
router.get('/users/logout', userController.getLogout)

router.post('/users/login',userController.postLogin)

router.get('/users/dashboard',ensureAuthenticated,userController.getDashboard)
module.exports = router;