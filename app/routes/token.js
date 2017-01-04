'use strict';


const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const methodOverride = require('method-override');


//Handles login and authentication
router.post('/token', (req, res, next) => {
    knex('users').where('email', req.body.email).first().then((user) => {
            if (!user) {
                //If there's no user
                res.sendStatus(401);
            }
            //check password
            return bcrypt.compare(req.body.password, user.hashpw);

        })
        .then(() => {
          //grab users again...because async
            knex('users').where('email', req.body.email).first().then((user) => {

                req.session.user = user;
                console.log(req.session);
                res.cookie('loggedIn', true);
                //render to whatever view you'd like with user as a variable
                res.render('index', {
                  user: req.session.user
                });
            })
        })
        //if bad password
        .catch(bcrypt.MISMATCH_ERROR, () => {
            res.sendStatus(401);
        })
});

//handles logout users
router.delete('/token', (req, res) => {
    req.session = null;
    res.clearCookie('loggedIn');
    //redirect to the login page
    res.redirect('/login.html');
});

module.exports = router;
