const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
const sequelize = require('sequelize')
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user.model');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'InputEmail', passwordField: 'InputPassword' }, (InputEmail, InputPassword, done) => {
            // Match user
            // console.log('passport local strategy')
            User.findOne({ where: { email: InputEmail } })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    // console.log('passport user', user);

                    // Match password
                    bcrypt.compare(InputPassword, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
        User.findByPk(id)
            .then(user => {
                console.log('deserializeUser user', user)
                // done(err, user);
                done(null,user)
            })
            .catch(err => {
                console.log(err)
            })
    });
};
