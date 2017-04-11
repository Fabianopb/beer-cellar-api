var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var jwt = require('express-jwt');
var User = require('../models/user');
var Beer = require('../models/beer');

var authorize = jwt({
  secret: process.env.BEER_CELLAR_KEY,
  userProperty: 'payload'
});

router.route('/')
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
