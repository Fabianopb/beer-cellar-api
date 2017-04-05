var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('../models/user');


passport.use(new localStrategy({
  usernameField: 'email'
}, function(username, password, done) {
  User.findOne({ email: username }, function (error, user) {
    if (error) {
      return done(error);
    } else if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    } else if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    } else {
      return done(null, user);
    }
  });
}
));
