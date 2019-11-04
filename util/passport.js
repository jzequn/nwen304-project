const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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


    
    passport.use(new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        enableProof: true
    },
        function (accessToken, refreshToken, profile, done) {
            // User.findOrCreate(..., function(err, user) {
            //   if (err) { return done(err); }
            //   done(null, user);
            // });
            const { id, displayName } = profile;
            // console.log('username:',displayName)
            // console.log("profile:",profile)
            User.findOne({ where: { fb_id: id } })
                .then(user => {
                    if (!user) {
                        // if can't find user, create one
                        // console.log('user not registered! fb')
                        return User.create({
                            fb_id: id,
                            username: displayName
                        })
                            .then(user => {
                                return user;
                            })
                            .catch(err => {
                                // console.log(err)
                                done(err)
                            })
                    }
                    return user;
                })
                .then(user => {
                    done(null, user);
                })
                .catch(err => {
                    done(err)
                })
        }
    ));


    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URLS
    },
        function (accessToken, refreshToken, profile, done) {
            //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //      return done(err, user);
            //    });

            const { id, displayName } = profile;
            // console.log('username:',displayName)
            // console.log("profile:",profile)
            User.findOne({ where: { google_id: id } })
                .then(user => {
                    if (!user) {
                        // if can't find user, create one
                        // console.log('user not registered! fb')
                        return User.create({
                            google_id: id,
                            username: displayName
                        })
                            .then(user => {
                                return user;
                            })
                            .catch(err => {
                                // console.log(err)
                                done(err)
                            })
                    }
                    return user;
                })
                .then(user => {
                    done(null, user);
                })
                .catch(err => {
                    done(err)
                })
            console.log('profile', profile)
        }
    ));

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
