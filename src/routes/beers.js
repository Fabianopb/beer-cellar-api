var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser').json();

var Beer = require('../models/beer');

router.route('/')
  .get(function(request, response) {
    Beer.find(function(error, result) {
      if (error) {
        response.send(error);
      } else {
        response.json(result);
      }
    });
  })
  .post(bodyParser, function(request, response) {
    var beer = new Beer(request.body);
    beer.save(function(error) {
      var errorMessage = {};
      if (error) {
        if (error.errors) {
          Object.keys(error.errors).forEach(function(key) {
            errorMessage[key] = error.errors[key].message;
          });
          error = errorMessage;
        }
        response.status(400).send(error);
      } else {
        response.status(201).json({message: 'Beer created!'});
      }
    });
  });

module.exports = router;
