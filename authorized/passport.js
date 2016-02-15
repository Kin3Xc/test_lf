'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('user_model');


// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('../config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function(passport) {

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

};