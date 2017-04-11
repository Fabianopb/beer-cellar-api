var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var User = require('../models/user');
var Beer = require('../models/beer');
var authorize = require('../config/authorize');

router.route('/')
  .get(authorize.token, function(request, response) {
    authorize.userId(request.payload._id, response);
    User.find({id: request.payload.id, 'beers.name': request.query.name}, function(error, user) {
      console.log(user);
    });
    User.findById(request.payload._id, function(error, user) {
      return response.status(200).json(user.beers);
    });
  })
  .post(authorize.token, bodyParser, function(request, response) {
    authorize.userId(request.payload._id, response);
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
  .put(authorize.token, bodyParser, function(request, response) {
    authorize.userId(request.payload._id, response);
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
  .delete(authorize.token, function(request, response) {
    authorize.userId(request.payload._id, response);
    User.findById(request.payload._id, function(error, user) {
      user.beers.id(request.params.id).remove();
      user.save(function(error) {
        if(error) { return response.status(400).send(error); }
        return response.status(200).json({message: 'Beer deleted!'});
      });
    });
  });

module.exports = router;
