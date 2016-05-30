var express = require('express');
var passport = require('passport');
var auth = require('../../auth/services');

var router = express.Router();

router
	.get('/', function (req, res, next) {
		passport.authenticate('google', {
			failureRedirect: '/',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
			],
			scope: JSON.stringify({ callbackUrl: req.query.callbackUrl }),
			session: false
		})(req, res, next);
	})

	.get('/callback', passport.authenticate('google', {
		failureRedirect: '/',
		session: false
	}), auth.setTokenCookie);

module.exports = router;