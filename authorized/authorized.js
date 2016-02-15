'use strict';

exports.ensureAuthorized = function(req, res, next){
	var bearerToken;
	var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // res.send(403);
        res.json({message: 'No tienes permiso para esta sección'});
    }
}