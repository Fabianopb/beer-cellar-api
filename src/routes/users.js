var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var passport = require('passport');
var User = require('../models/user');

router.route('/register')
  .post(bodyParser, function(request, response) {
    var user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.setPassword(request.body.password);
    console.log('user:', user);
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

module.exports = router;
