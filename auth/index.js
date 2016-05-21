var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../configs');
var models = require('../models');

function google () {
	passport.use(new GoogleStrategy({
			clientID: config.auth.google.clientID,
			clientSecret: config.auth.google.clientSecret,
			callbackURL: config.auth.google.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			models.users
				.findOne({
					include: [{
						model: models.users_google,
						where: { id: profile.id }
					}
				]})
				.then(function (user) {
					if (!user) {
						models.users.create({
							name: profile.displayName,
							email: profile.emails[0].value,
							image: profile.photos[0].value || null,
							provider: 'google',
							users_google: {
								id: profile.id, 
								token: accessToken,
								json: JSON.stringify(profile._json)
							}}, {
							  include: [ models.users_google ]
							})
						.then(function (user) {
							console.log(user.get({plain: true}))
							done(null, user)
						})
						.catch(done)
					} else {
						return done(null, user);
					}
				})
				.catch(done);
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
			models.users
				.findOne({ 
					include: [{
						model: models.users_facebook,
						where: { id: profile.id }
					}
				]})
				.then(function (user) {
					if (!user) {
						models.users.create({
							name: profile.displayName,
							email: profile.emails[0].value,
							image: profile.photos[0].value || null,
							provider: 'facebook',
							users_facebook: {
								id: profile.id, 
								token: accessToken,
								json: JSON.stringify(profile._json)
							}}, {
							  include: [ models.users_facebook ]
							})
						.then(function (user) {
							console.log(user.get({plain: true}))
							done(null, user)
						})
						.catch(done)
					} else {
						return done(null, user);
					}
				})
				.catch(done);
		}
	));
};

function getProviderData () {

}

module.exports = {
	google: google,
	facebook: facebook
}