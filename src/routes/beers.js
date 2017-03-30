var express = require('express');
var router = express.Router();

var db = require('../database');

var bodyParser = require('body-parser').json();

router.route('/')
  .get(function(request, response) {
    db.get().collection('beers', function(error, collection) {
      collection.find().toArray(function(error, documents) {
        response.json(documents);
      });
    });
  })
  .post(bodyParser, function(request, response) {
    var newBeer = request.body;
    db.get().collection('beers', function(error, collection) {
      collection.insertOne(newBeer, function() {
        response.status(201).json(newBeer);
      });
    });
  });

module.exports = router;
