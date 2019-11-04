const { check, validationResult } = require('express-validator');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const pool = require('../util/database'); // When not using Sequelize

exports.getRegister = (req, res, next) => {
    res.render('users/register');
}


exports.postRegister = (req, res, next) => {
    const { Username, InputEmail, InputPassword, RepeatPassword } = req.body;
    const errors = [];

    if (!Username || !InputEmail || !InputPassword || !RepeatPassword) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (InputPassword != RepeatPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (InputPassword.length > 0) {

        // Create an array and push all possible values that you want in password
        var matchedCase = new Array();
        matchedCase.push("[$@$!%*#?&]"); // Special Charector
        matchedCase.push("[A-Z]");      // Uppercase Alpabates
        matchedCase.push("[0-9]");      // Numbers
        matchedCase.push("[a-z]");     // Lowercase Alphabates

        console.log("test")

        // Check the conditions
        var ctr = 0;
        for (var i = 0; i < matchedCase.length; i++) {
            if (new RegExp(matchedCase[i]).test(InputPassword)) {
                ctr++;
            }
        }
        // Display it
        var color = "";
        var strength = "";
        switch (ctr) {
            case 0:
            case 1:
            case 2:
                strength = "Very Weak";
                color = "red";
                break;
            case 3:
                strength = "Medium";
                color = "orange";
                break;
            case 4:
                strength = "Strong";
                color = "green";
                break;
        }
        if (InputPassword.length < 9) {
            errors.push({ msg: 'Password must contain at least 8 characters' });
        } else if (strength === "" || strength === "Very Weak") {
            errors.push({ msg: 'Password is Too Weak' });
        }
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
                        // console.log('hash:', hash, 'InputPassword:', InputPassword)
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
                                // console.log('user msg:', req.flash.success_msg)
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
    // console.log('users controller postLogin - post login')
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