var express = require('express');
var passport = require('passport');
var auth = require('../../auth/services');

var router = express.Router();

router
	.get('/', function (req, res, next) {
		passport.authenticate('facebook', {
			failureRedirect: req.query.callbackUrl,
			authType: 'rerequest', 
			scope: ['email', 'public_profile'],
			scope: JSON.stringify({ callbackUrl: req.query.callbackUrl }),
			session: false
		})(req, res, next);
	})

	.get('/callback', passport.authenticate('facebook', {
		failureRedirect: '/',
		session: false
	}), auth.setTokenCookie);

module.exports = router;