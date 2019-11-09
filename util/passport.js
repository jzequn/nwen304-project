const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const mongoose = require('mongoose');
const sequelize = require('sequelize')
const bcrypt = require('bcryptjs');
const pool = require('../util/postgres')
// Load User model
// const User = require('../models/user.model');

/**
 * author: zequn Jiang
 * strategy: local strategy
 */
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'InputEmail', passwordField: 'InputPassword' }, (InputEmail, InputPassword, done) => {
            // Match user
            // console.log('passport local strategy')
            const queryString = `
                select * from users1 where email = '${InputEmail}'
            `
            pool.query(queryString)
                .then(result => {
                    console.log('result', result)
                    console.log('password', result.rows[0].user_password)
                    if (result.rows.length > 0) {
                        // Match password
                        bcrypt.compare(InputPassword, result.rows[0].user_password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, result.rows[0]);
                            } else {
                                return done(null, false, { message: 'Password incorrect' });
                            }
                        });
                    } else {
                        if (!user) {
                            return done(null, false, { message: 'That email is not registered' });
                        }
                    }
                })
            // User.findOne({ where: { email: InputEmail } })
            //     .then(user => {
            //         if (!user) {
            //             return done(null, false, { message: 'That email is not registered' });
            //         }

            //         // console.log('passport user', user);

            //         // Match password
            //         bcrypt.compare(InputPassword, user.password, (err, isMatch) => {
            //             if (err) throw err;
            //             if (isMatch) {
            //                 return done(null, user);
            //             } else {
            //                 return done(null, false, { message: 'Password incorrect' });
            //             }
            //         });
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        })




    );


    /**
     * author: zequn Jiang co-author: brody
     * strategy: local strategy
     * 
     */
    passport.use(new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        enableProof: true
    },
        function (accessToken, refreshToken, profile, done) {
            const { id, displayName } = profile;
            // console.log('username:',displayName)
            // console.log("profile:",profile)

            const queryString = `
                select * from users1 
                where fb_id = ${id}
            `
            pool.query(queryString)
                .then(result => {
                    if (result.rows[0].length > 0) {
                        done(null, result.rows[0]);
                    } else {
                        //create user
                        const queryString_createUser = `
                            insert into users1 (fb_id,username)
                            values ('${id}','${displayName}')
                        `;
                        pool.query(queryString_createUser)
                            .then(result => {
                                // return user
                                pool.query(queryString)
                                    .then(result => {
                                        done(null, result.rows[0]);
                                    })
                                    .catch(err => {
                                        done(err)
                                    })
                            })
                    }
                })
                .catch(err => {
                    done(err)
                })
            // User.findOne({ where: { fb_id: id } })
            //     .then(user => {
            //         if (!user) {
            //             // if can't find user, create one
            //             // console.log('user not registered! fb')
            //             return User.create({
            //                 fb_id: id,
            //                 username: displayName
            //             })
            //                 .then(user => {
            //                     return user;
            //                 })
            //                 .catch(err => {
            //                     // console.log(err)
            //                     done(err)
            //                 })
            //         }
            //         return user;
            //     })
            //     .then(user => {
            //         done(null, user);
            //     })
            //     .catch(err => {
            //         done(err)
            //     })
        }
    ));


    /**
     * author: zequn Jiang co-author: brody
     * strategy: local strategy
     * 
    */
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URLS
    },
        function (accessToken, refreshToken, profile, done) {

            const { id, displayName } = profile;
            // console.log('username:',displayName)
            // console.log("profile:",profile)
            const queryString = `
                select * from users1 
                where google_id = ${id}
            `
            pool.query(queryString)
                .then(result => {
                    console.log('google result',result)
                    if (result.rows.length > 0) {
                        
                        done(null, result.rows[0]);
                    } else {
                        //create user
                        const queryString_createUser = `
                        insert into users1 (google_id,username)
                        values ('${id}','${displayName}')
                    `;
                        pool.query(queryString_createUser)
                            .then(result => {
                                // return user
                                pool.query(queryString)
                                    .then(result => {
                                        done(null, result.rows[0]);
                                    })
                                    .catch(err => {
                                        done(err)
                                    })
                            })
                    }
                })
                .catch(err => {
                    done(err)
                })
            // User.findOne({ where: { google_id: id } })
            //     .then(user => {
            //         if (!user) {
            //             // if can't find user, create one
            //             // console.log('user not registered! fb')
            //             return User.create({
            //                 google_id: id,
            //                 username: displayName
            //             })
            //                 .then(user => {
            //                     return user;
            //                 })
            //                 .catch(err => {
            //                     // console.log(err)
            //                     done(err)
            //                 })
            //         }
            //         return user;
            //     })
            //     .then(user => {
            //         done(null, user);
            //     })
            //     .catch(err => {
            //         done(err)
            //     })
            console.log('profile', profile)
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // User.findByPk(id)
        //     .then(user => {
        //         console.log('deserializeUser user', user)
        //         // done(err, user);
        //         done(null,user)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        const queryString = `
             select * from users1 
             where id = ${id}
        `
        pool.query(queryString)
            .then(result => {
                if (result.rows.length > 0) {
                    done(null, result.rows[0])
                } else {
                    console.log(err);
                }

            })
            .catch(err => {
                console.log(err);
            })
    });
};
