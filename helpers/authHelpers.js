const authHelpers = {
  currentUser(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.currentUser = req.user;
      return next();
    }
    else {
      return next();
    }
  } 
}

module.exports = authHelpers;
