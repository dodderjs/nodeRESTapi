var config = require('../configs');
var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var models = require('../models');
var validateJwt = require('express-jwt')({ secret: config.secret.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated () {
	return compose()
		.use(function(req, res, next) {
			// allow access_token to be passed through query parameter as well
			if(req.query && req.query.hasOwnProperty('access_token') || req.cookies && req.cookies.token) {
				req.headers.authorization = 'Bearer ' + (req.query.access_token || req.cookies.token);
			}

			validateJwt(req, res, next);
		})
		// Attach user to request
		.use(function(req, res, next) {
			models.users
				.findOne({
					where: { id: req.user.id }
				})
				.then(function (user) {
					if (!user) return res.send(401);

					req.user = user;
					next();
				})
				.catch(next);
		});
}
/**
 * Returns a jwt token signed by the app secret
 */
function signToken (id) {
	return jwt.sign({ id: id }, config.secret.session, { expiresIn: 18000 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie (req, res, next) {
	if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
	var token = signToken(req.user.id);
	res.cookie('token', token);
	res.redirect('/user/me');
	//res.json({ token: token });
}

module.exports = {
	isAuthenticated: isAuthenticated,
	signToken: signToken,
	setTokenCookie: setTokenCookie
}