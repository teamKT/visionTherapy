// require all the things
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('cookie-session');
const passport = require('passport')
const routes = require('./routes/index');
const helpers = require('./helpers/authHelpers')
if(process.env.NODE_ENV !== "production"){
    require('dotenv').load();
}
// use middleware
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SECRET
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

require('./helpers/passport');

// view engine
app.set('view engine', 'jade');

// routers
app.use('/doctors/:doctor_id/patients/:patient_id/exercises', routes.exercises);
app.use('/doctors/:doctor_id/patients', routes.patients);
app.use('/auth', routes.auth);
app.use('/doctors', routes.doctors);
app.use('/', routes.statics);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// listener
app.listen(process.env.PORT || 3000, function() {
  console.log('starting localhost:3000');
});

module.exports = app;