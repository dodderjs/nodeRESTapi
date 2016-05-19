var user = require('./user');
var google = require('./auth/google');
var facebook = require('./auth/facebook');
var authSetup = require('../auth');

authSetup.facebook();
authSetup.google();

function setup (app) {

	app.use('/user', user);  	
	app.use('/auth/google', google);
	app.use('/auth/facebook', facebook);
	

	app.use('/', function (req, res, next) {
		console.log('session: ', req.originalUrl)
		res.render('index')
	});
}

module.exports = setup;