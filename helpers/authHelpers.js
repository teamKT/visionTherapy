const authHelpers = {
  currentUser(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.currentUser = req.user;
      return next();
    }
    else {
      return next();
    }
  },
  ensureCorrectUser(req,res,next){
    if(+req.params.id !== req.user.id){
      return res.redirect('/auth/doctors');
    }
    else {
      return next();
    }
  },
  signedOn(req,res,next){
    if (req.isAuthenticated()) {
      res.redirect('/auth/doctors')
    }
    else {
      return next();
    }
  },
  isDoctor(req,res,next){
    if(req.user.isDoctor){
      return next();
    }
    else {
      return res.redirect('/auth/patients/');
    }
  },
  isPatient(req,res,next){
    if(!req.user.isDoctor){
      return next();
    }
    else {
      return res.redirect('/auth/doctors');
    }
  },
}

module.exports = authHelpers;
