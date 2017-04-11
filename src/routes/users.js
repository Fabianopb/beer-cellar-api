var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var User = require('../models/user');
var Beer = require('../models/beer');
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
        return response.status(400).send(error);
      } else {
        var token = user.generateJwt();
        return response.status(200).json({ token: token });
      }
    });
  });

router.route('/login')
  .post(bodyParser, function(request, response) {
    passport.authenticate('local', function(error, user, info){
      if (error) {
        return response.status(404).json(error);
      }
      if(user){
        var token = user.generateJwt();
        return response.status(200).json({ token: token });
      } else {
        return response.status(401).json(info);
      }
    })(request, response);
  });

router.route('/profile')
  .get(authorize, function(request, response) {
    if (!request.payload._id) {
      return response.status(401).json({ message: 'UnauthorizedError: private profile' });
    } else {
      User.findById(request.payload._id).exec(function(error, user) {
        return response.status(200).json(user);
      });
    }
  });

router.route('/beers')
  .get(authorize, function(request, response) {
    if (!request.payload._id) {
      return response.status(401).json({ message: 'UnauthorizedError: private profile' });
    }
    User.findById(request.payload._id, function(error, user) {
      return response.status(200).json(user.beers);
    });
  })
  .post(authorize, bodyParser, function(request, response) {
    if (!request.payload._id) {
      return response.status(401).json({ message: 'UnauthorizedError: private profile' });
    }
    User.findById(request.payload._id, function(error, user) {
      var beer = new Beer(request.body);
      user.beers.push(beer);
      user.save(function(error) {
        if(error) { return response.status(400).send(error); }
        return response.status(200).json({message: 'Beer created!'});
      });
    });
  });

router.route('/beers/:id')
  .put(authorize, bodyParser, function(request, response) {
    if (!request.payload._id) {
      return response.status(401).json({ message: 'UnauthorizedError: private profile' });
    }
    User.findById(request.payload._id, function(error, user) {
      var beer = user.beers.id(request.params.id);
      beer.name = request.body.name || beer.name;
      beer.country = request.body.country || beer.country;
      user.save(function(error) {
        if(error) { return response.status(400).send(error); }
        return response.status(200).json({message: 'Beer updated!'});
      });
    });
  })
  .delete(authorize, function(request, response) {
    if (!request.payload._id) {
      return response.status(401).json({ message: 'UnauthorizedError: private profile' });
    }
    User.findById(request.payload._id, function(error, user) {
      user.beers.id(request.params.id).remove();
      user.save(function(error) {
        if(error) { return response.status(400).send(error); }
        return response.status(200).json({message: 'Beer deleted!'});
      });
    });
  });


module.exports = router;
