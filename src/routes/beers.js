var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var User = require('../models/user');
var Beer = require('../models/beer');
var authorize = require('../config/authorize');

var saveData = function(user, error, response, message) {
  user.save(function(error) {
    if(error) { return response.status(400).send(error); }
    return response.status(200).json({message: message});
  });
};

router.route('/')
  .get(authorize, function(request, response) {
    User.findById(request.payload._id, function(error, user) {
      return response.status(200).json(user.beers);
    });
  })
  .post(authorize, bodyParser, function(request, response) {
    User.findById(request.payload._id, function(error, user) {
      var beer = new Beer(request.body);
      user.beers.push(beer);
      saveData(user, error, response, 'Beer created!');
    });
  });

router.route('/:id')
  .put(authorize, bodyParser, function(request, response) {
    User.findById(request.payload._id, function(error, user) {
      var beer = user.beers.id(request.params.id);
      beer.name = request.body.name || beer.name;
      beer.country = request.body.country || beer.country;
      saveData(user, error, response, 'Beer updated!');
    });
  })
  .delete(authorize, function(request, response) {
    User.findById(request.payload._id, function(error, user) {
      user.beers.id(request.params.id).remove();
      saveData(user, error, response, 'Beer removed!');
    });
  });

module.exports = router;
