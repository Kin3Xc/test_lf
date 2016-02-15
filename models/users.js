'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	name: String,
	email: { type: String, required: true, index: { unique: true } },
	password: String,
  tel: String,
	state: String,
  token: String,
  avatar:String,
	createdAt: {type:Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

// compare to pwd in login
UserSchema.methods.comparePassword = function(password, done){
 bcrypt.compare(password, this.password, function(err, isMatch){
   // done(err, isMatch);
  if (err) return done(err);
  done(null, isMatch);
 });
};


module.exports = mongoose.model('user_model', UserSchema);
