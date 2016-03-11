function ensureAuthenticated(req, res, next) {
  // check if user is authenticated.
    // if not, redirect to login.
    // otherwise, call next();
    if (!req.user) {
      res.redirect('/auth/facebook');
    } else {
      return next();
    }
}

function ensureAdmin(req, res, next) {
  if (req.user) {
    if(!req.user[0].is_admin) {
      res.redirect('/auth/facebook');
    } else {
      return next();
    }
  } else {
    res.redirect('/auth/facebook');
  }
}

function loginRedirect(req, res, next) {
  // check if user is authenticated.
    // if not, call next();
    // otherwise, redirect to main route;
    if (req.user) {
      res.redirect('/');
    } else {
      return next();
    }
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  loginRedirect: loginRedirect,
  ensureAdmin: ensureAdmin
};
