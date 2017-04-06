var express = require('express');
var app = express();
var mongoose = require('mongoose');
var users = require('./routes/users');
var beers = require('./routes/beers');
var passport = require('passport');

app.use(passport.initialize());
app.use('/users', users);
app.use('/beers', beers);

mongoose.connect(process.env.BEER_CELLAR_MONGODB);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: err.name + ': ' + err.message });
  }
  next();
});

app.get('/', function(request, response) {
  response.json('We\'re up and running!');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');
