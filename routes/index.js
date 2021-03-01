"use strict";
const express = require('express');
const router = express.Router();
const User = require('../models/model-user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Register user
router.post('/register', (req, res) => {
  const {userName, password} = req.body;

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

// Login
router.post('/authenticate', (req, res) => {
  const {userName, password} = req.body;
  
  User.findOne({
    userName
  }, (err, data) => {
    if(err) throw data;
    if(!data){
      res.json({
        status: false,
        message: 'Authentication failed, user not found!'
      });
    }else{
      bcrypt.compare(password, data.password).then(result => {
        if(!result){
          res.json({
            status: false,
            message: 'Authentication failed, wrong password'
          });
        }else{
          const payload = {
            userName
          };
          const token = jwt.sign(payload, req.app.get('api_secret_keys'), {expiresIn: 720 /* 12 hours */});
          res.json({
            status: true,
            token
          });
        }
      });
    }
  });
});

module.exports = router;