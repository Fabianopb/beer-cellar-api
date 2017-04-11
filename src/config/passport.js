var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use(new localStrategy({
  usernameField: 'email'
}, function(username, password, done) {
  User.findOne({ email: username }, function (error, user) {
    if (error) {
      return done(error);
    } else if (!user || !user.validPassword(password)) {
      return done(null, false, {
        message: 'Invalid credentials'
      });
    } else {
      return done(null, user);
    }
  });
}
));
