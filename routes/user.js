/**
 * Author: Zequn Jiang
 */
const express = require('express');
const passport = require('passport')
router = express.Router();
const { ensureAuthenticated } = require('../util/auth')
const userController = require('../controllers/user');

/**
 * route: get-'/users/register',  post-'/users/register', 
 *        get-'/users/login',     get-'/users/logout'
 *        post-'/users/login',    get-'/users/dashboard'
 * Author: Zequn Jiang
 */
router.get('/users/register', userController.getRegister)
router.post('/users/register', userController.postRegister)
router.get('/users/login', userController.getLogin)
router.get('/users/logout', ensureAuthenticated, userController.getLogout)
router.post('/users/login', userController.postLogin)
router.get('/users/dashboard', ensureAuthenticated, userController.getDashboard)
/////////////router.get('/users/search', userController.listSearch)


router.get('/users/changepassword', ensureAuthenticated, userController.getChangePassword)
router.post('/users/postchangepassword', ensureAuthenticated, userController.postChangePassword)
router.get('/users/resetpassword', userController.getResetPassword)
router.post('/users/postresetpassword', userController.postResetPassword)

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
  function (req, res) {
    res.redirect('/');
  });



module.exports = router;