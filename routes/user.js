const express = require('express');
const passport = require('passport')
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
router.get('/users/logout', ensureAuthenticated,userController.getLogout)
/////////////router.get('/users/search', userController.listSearch)

router.post('/users/login',userController.postLogin)

router.get('/users/dashboard',ensureAuthenticated,userController.getDashboard)




// fb login strategy 
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    }));


    router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'read_stream' })
  );

// google login strategy
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    res.redirect('/');
  });



module.exports = router;