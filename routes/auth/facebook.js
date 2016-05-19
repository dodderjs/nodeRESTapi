var express = require('express');
var passport = require('passport');
var auth = require('../../auth/services');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    failureRedirect: '/',
    authType: 'rerequest', 
    scope: ['email', 'public_profile'],
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;