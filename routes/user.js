var express = require('express');
var config = require('../configs');
var auth = require('../auth/services');

var router = express.Router();

function test (req, res) {
	console.log('BENT', res.cookie.token, req.user)
	res.status(200).json({
		token: res.token
	});
}

router.get('/', test);
router.delete('/:id', test);
router.get('/me', auth.isAuthenticated(), test);
router.put('/:id/password', auth.isAuthenticated(), test);
router.get('/:id', auth.isAuthenticated(), test);
router.post('/', test);

module.exports = router;