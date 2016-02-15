'use strict';

var mongoose = require('mongoose');
var path = require('path');
var jwt = require("jsonwebtoken");

var config = require('../config');
var service = require('../services/token');
var User = require('../models/users');


// return user
exports.me = function(req, res){
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
};

// login user
exports.login = function(req, res){  

	User.findOne({email: req.body.email}, function(err, user) {
        if (err) {

            res.json({
                type: false,
                data: "Error occured: " + err
            });

        } else {

            if (user) {
            	// verifico pwd
            	user.comparePassword(req.body.password, function(err, entra){
					if (err) throw err;

					if(!entra){

						res.json({
							type: false,
							data: "Password incorrecto"
						});

					}else{

						res.json({
		                    type: true,
		                    data: user,
		                    token: user.token
		                });
					}

				});


            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
};


// create user
exports.signup = function(req, res){

    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {

                var userModel = new User();
                userModel.name = req.body.name;
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.tel = req.body.tel;
                userModel.state = false;
                userModel.provider = "Email";
                userModel.avatar = 'https://at-cdn-s01.audiotool.com/2013/05/11/users/guess_audiotool/avatar512x512-4e263bad6d0c46f2b12b82b614043589.jpg';


                userModel.save(function(err, user) {
                    if(err){
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    }

                    user.token = jwt.sign(user, config.JWT_SECRET);
                    user.save(function(err1, user1) {
                        if(err1){
                            res.json({
                                type: false,
                                data: "Error occured: " + err1
                            });
                        }

                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });

                    });
                })
            }
        }
    });
}