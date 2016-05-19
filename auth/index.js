var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../configs');
var User = require('../models/user');

function google () {
	passport.use(new GoogleStrategy({
			clientID: config.auth.google.clientID,
			clientSecret: config.auth.google.clientSecret,
			callbackURL: config.auth.google.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
				'provider': 'google',
				'id': profile.id
			}, function(err, user) {
				if (!user) {
					user = User.create({
						id: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						image: profile.photos[0].value || null,
						token: accessToken,
						provider: 'google',
						google: profile._json
					}, function(err) {
						if (err) done(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));
};

function facebook () {
	passport.use(new FacebookStrategy({
			clientID: config.auth.facebook.clientID,
			clientSecret: config.auth.facebook.clientSecret,
			callbackURL: config.auth.facebook.callbackURL,
  			profileFields: ['id', 'displayName', 'picture', 'email']
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({
				'provider': 'facebook',
				'id': profile.id
			}, function(err, user) {
				if (!user) {
					user = User.create({
						id: profile.id,
						name: profile.displayName,
						email: profile.emails && profile.emails[0].value,
						image: profile.photos && profile.photos[0].value || null,
						token: accessToken,
						provider: 'facebook',
						facebook: profile._json
					}, function(err) {
						if (err) done(err);
						return done(err, user);
					});
				} else {
					return done(err, user);
				}
			});
		}
	));
};

module.exports = {
	google: google,
	facebook: facebook
}