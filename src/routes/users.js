var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var User = require('../models/user');
var passport = require('passport');
var authorize = require('../config/authorize');
require('../config/passport');

router.route('/register')
  .post(bodyParser, function(request, response) {
    var user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.setPassword(request.body.password);
    user.save(function(error) {
      if (error) {
        return response.status(400).send(error);
      }
      var tokenSignature = user.generateJwt();
      return response.status(200).json(tokenSignature);
    });
  });

router.route('/login')
  .post(bodyParser, function(request, response) {
    passport.authenticate('local', function(error, user, info){
      if(!user) {
        return response.status(401).json(info);
      }
      var tokenSignature = user.generateJwt();
      return response.status(200).json(tokenSignature);
    })(request, response);
  });

router.route('/profile')
  .get(authorize, function(request, response) {
    User.findById(request.payload._id, function(error, user) {
      return response.status(200).json(user);
    });
  });

module.exports = router;
