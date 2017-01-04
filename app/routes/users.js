'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.get('/users', function(req, res) {
    knex('users').then((users) => {
        res.json(users);

    })
});


//Handles user registration
router.post('/users', function(req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then((hashpw) => {
        console.log(hashpw);
        knex('users').insert({
            // fill your user database however you need
        }).then((user) => {
            console.log(user);
            res.redirect('/users');
        })

    })

});

module.exports = router;
