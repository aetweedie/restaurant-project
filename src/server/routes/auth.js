var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/'
}), function (req, res, next) {
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logOut();
  req.session = null;
  res.redirect('/');
});

module.exports = router;
