var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser').json();

var Beer = require('../models/beer');

router.route('/')
  .get(function(request, response) {
    Beer.find(request.query, function(error, data) {
      if (error) {
        response.send(error);
      } else {
        response.json(data);
      }
    });
  })
  .post(bodyParser, function(request, response) {
    var beer = new Beer(request.body);
    beer.save(function(error) {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(200).json({message: 'Beer created!'});
      }
    });
  });

router.route('/:id')
  .put(bodyParser, function(request, response) {
    Beer.findById(request.params.id, function(error, data) {
      if (error) {
        response.send(error);
      }
      data.name = request.body.name || data.name;
      data.country = request.body.country || data.country;
      data.save(function(error) {
        if (error) {
          response.send(error);
        }
        response.status(200).json({ message: 'Beer updated!' });
      });
    });
  })
  .delete(function(req, response) {
    Beer.remove({
      _id: req.params.id
    }, function(error) {
      if (error) {
        response.send(error);
      }
      response.status(200).json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;
