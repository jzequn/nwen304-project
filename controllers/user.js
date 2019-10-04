const { check, validationResult } = require('express-validator');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// exports.postUser = (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     User.create({
//         username: req.body.username,
//         password: req.body.password
//     }).then(user => res.json(user))
// }


exports.getRegister = (req, res, next) => {
    res.render('users/register');
}

exports.postRegister = (req, res, next) => {
    // only match the form name instead of form id
    // const username = req.body.Username;
    // const email = req.body.InputEmail;
    // const password = req.body.InputPassword;
    // const repeatPassword = req.body.RepeatPassword;

    // const user = new User(username, email, password);
    // user
    //     .save()
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    const { Username, InputEmail, InputPassword, RepeatPassword } = req.body;
    const errors = [];

    if (!Username || !InputEmail || !InputPassword || !RepeatPassword) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (InputPassword != RepeatPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (InputPassword.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        console.log('errors.length> 0')
        errors.map(err => {
            console.log("err msg - ", err.msg)
        })
        res.render('users/register', {
            errors,
            Username,
            InputEmail,
            InputPassword,
            RepeatPassword
        });
    } else {
        User.findOne({ where: { email: InputEmail } }).then(user => {
            console.log(user)
            if (user) {
                errors.push({ msg: 'Email already exists' });
                // console.log("Email already exists", console.log(user.email, 'inputEmail', InputEmail, 'InputPassword', InputPassword))
                res.render('users/register', {
                    errors,
                    Username,
                    InputEmail,
                    InputPassword,
                    RepeatPassword
                });
            } else {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(InputPassword, salt, (err, hash) => {
                        if (err) throw err;
                        console.log('hash:', hash, 'InputPassword:', InputPassword)
                        // InputPassword = hash;


                        User.create({
                            username: Username,
                            email: InputEmail,
                            password: hash
                        })
                            .then(result => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                console.log('user msg:', req.flash.success_msg)
                                res.redirect('/users/login');

                                // console.log('create user', result)
                                // res.redirect('/');
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    });
                });
            }
        });
    }
}

exports.getLogin = (req, res, next) => {
    res.render('users/login');
}

exports.postLogin = (req, res, next) => {
    console.log('users controller postLogin - post login')
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
}

exports.getLogout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out!')
    // res.render('users/logout');
    res.redirect('/users/login')
}


exports.getDashboard = (req, res, next) => {
    res.render('users/dashboard', {
        name: req.user.username
    });
}