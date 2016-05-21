var express = require('express');
var config = require('../configs');
var auth = require('../auth/services');
var models = require('../models');
var User = models.users;

var router = express.Router();

//router.get('/', test);
//router.delete('/:id', test);
router.get('/me', auth.isAuthenticated(), 
	function (req, res) {
		User.findOne({ where: { id: req.user.id }})
		.then(function (user) {
			res.status(200).json(user);
		})
	});
router.get('/:id', auth.isAuthenticated(), 
	function (req, res) {
		User.findOne({ where: { id: req.params.id }})
		.then(function (user) {
			res.status(200).json(user);
		})
	});
//router.post('/', test);

module.exports = router;