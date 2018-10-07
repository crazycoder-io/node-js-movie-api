"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/model-user');
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Register user
router.post('/register', (req, res) => {
  const { userName, password } = req.body;

  bcrypt.hash(password, 10 /* default encryption range */).then(hash => {
    const user = new User({
      userName,
      password: hash
    });
    
    const promise = user.save();
    promise.then(data => {
      res.json(data);
    }).catch(err => {
      res.json(err);
    });
  });  
});

module.exports = router;