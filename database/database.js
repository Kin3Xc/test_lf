'use strict';

var mongoose = require('mongoose');

exports.connect = function(err, res){
	// mongoose.connect('mongodb://localhost/lf_db');// LOCAL
	mongoose.connect('mongodb://root:root@ds051873.mongolab.com:51873/forshare_db');// REMOTE

	if (err) throw err;
	console.log('CONNECT TO DABASE');
}