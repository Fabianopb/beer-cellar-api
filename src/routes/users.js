var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var User = require('../models/user');
var passport = require('passport');
var jwt = require('express-jwt');
require('../config/passport');

var authorize = jwt({
  secret: process.env.BEER_CELLAR_KEY,
  userProperty: 'payload'
});

router.route('/register')
  .post(bodyParser, function(request, response) {
    var user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.setPassword(request.body.password);
    user.save(function(error) {
      if (error) {
        response.status(400).send(error);
      } else {
        var token = user.generateJwt();
        response.status(200).json({ token: token });
      }
    });
  });

router.route('/login')
  .post(bodyParser, function(request, response) {
    passport.authenticate('local', function(error, user, info){
      if (error) {
        response.status(404).json(error);
        return;
      }
      if(user){
        var token = user.generateJwt();
        response.status(200).json({ token: token });
      } else {
        response.status(401).json(info);
      }
    })(request, response);
  });

router.route('/profile')
  .get(authorize, function(request, response) {
    if (!request.payload._id) {
      response.status(401).json({ message: 'UnauthorizedError: private profile' });
    } else {
      User.findById(request.payload._id).exec(function(error, user) {
        var token = user.generateJwt();
        response.status(200).json({ user: user, token: token });
      });
    }
  });

module.exports = router;
