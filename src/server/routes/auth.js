var express   = require('express');
var router    = express.Router();
var passport  = require('passport');
var login     = require('connect-ensure-login');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/facebook'
}), function (req, res, next) {
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  req.logOut();

  res.redirect('/');
});

module.exports = router;
