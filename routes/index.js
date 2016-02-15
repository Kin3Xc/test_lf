'use strict';

// Routes

var express = require('express');
var router = express.Router();

var authorized = require('../authorized/authorized');
var users = require('../controllers/users');

// route home
router.get('/', function(req, res){
  res.json({
  	message: 'Welcome to API LENDINGFRONT',
  	author: 'LF',
  	created: '13/02/2016'
  });
});


// user
router.post('/api/v1/login', users.login);
router.post('/api/v1/signup', users.signup);
router.get('/api/v1/me', authorized.ensureAuthorized, users.me);


// export el module
module.exports = router;