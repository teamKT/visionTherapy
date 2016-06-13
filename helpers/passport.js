const passport = require('passport')
const passportLocal = require("passport-local");
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

passport.use(new passportLocal.Strategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]',
  passReqToCallback: true
},(req, username, password, done) =>{
    if (req.originalUrl === '/auth/doctor-login') {
      knex('doctors').where({username}).first().then((user) =>{
        if (!user) {
          return done(null, false, req.flash('loginMessage1','Incorrect username/password'));
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done (null, false, req.flash('loginMessage1','Incorrect username/password'));
        }
        else {
          return done(null, user);
        }
      }).catch((err) => {
        return done(err)
      })      
    } else if (req.originalUrl === '/auth/patient-login') {
      knex('patients').where({username}).first().then((user) =>{
        if (!user) {
          return done(null, false, req.flash('loginMessage2','Incorrect username/password'));
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done (null, false, req.flash('loginMessage2','Incorrect username/password'));
        }
        else {
          return done(null, user);
        }
      }).catch((err) => {
        return done(err)
      })
    } else if (req.originalUrl === '/auth/sample') {
      knex('doctors').where('id', 99).first().then((user) => {
        return done(null, user);
      })
    }
  }
));

passport.serializeUser((user, done) =>{
  if(user.isDoctor) {
    delete user.firstname;
    delete user.lastname;
    delete user.email;
    delete user.username;
    delete user.password;
    delete user.created_at;
    done(null, user);
  } else if (!user.isDoctor) {
    delete user.childname;
    delete user.parentname;
    delete user.username;
    delete user.password;
    delete user.doctor_id;
    delete user.created_at;
    done(null, user);
  }
});

passport.deserializeUser((user, done) =>{
  if (user.isDoctor) {
    knex('doctors').where({id: user.id}).first()
      .then((user) =>{
        done(null, user);
      }).catch((err) =>{
        done(err,null);
      });
  } else if (!user.isDoctor) {
    knex('patients').where({id: user.id}).first()
      .then((user) =>{
        done(null, user);
      }).catch((err) =>{
        done(err,null);
      });
  }
});

module.exports = passport;
