'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
/*this will get home page*/
router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

/*POST method for login option with authintictaion*/
//Try to login with passport
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/*Logout */
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

/*POST for register pug*/
router.post('/register', function (req, res) {
    //this will insert user
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var registerUser = {
            username: req.body.username,
            password: hash
        }
        // this will Check if user already exists or not 
        userModel.find({ username: registerUser.username }, function (err, user) {
            if (err) console.log(err);
            if (user.length) return res.redirect('/login');
            const newUser = new userModel(registerUser);
            newUser.save(function (err) {
                console.log('Inserting');
                if (err) console.log(err);
                req.login(newUser, function (err) {
                    console.log('Trying to login');
                    if (err) console.log(err);
                    return res.redirect('/');
                });
            });
        });
    })
});

/*router for  register*/
router.get('/register', function (req, res) {
    res.render('register');
});


/* router for sell*/
router.get('/sell', function (req, res) {
    res.render('sell');
});

/*GET for login*/
router.get('/login', function (req, res) {
    res.render('login');
});


module.exports = router;
