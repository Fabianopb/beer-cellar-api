var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser').json();
var jwt = require('express-jwt');
var Beer = require('../models/beer');

var authorize = jwt({
  secret: process.env.BEER_CELLAR_KEY,
  userProperty: 'payload'
});

router.route('/')
  .get(authorize, function(request, response) {
    request.query._creator = request.headers.creator_id;
    Beer.find(request.query, function(error, data) {
      if (error) {
        return response.send(error);
      } else {
        return response.json(data);
      }
    });
  })
  .post(authorize, bodyParser, function(request, response) {
    var beer = new Beer(request.body);
    beer._creator = request.headers.creator_id;
    beer.save(function(error) {
      if (error) {
        return response.status(400).send(error);
      } else {
        return response.status(200).json({message: 'Beer created!'});
      }
    });
  });

router.route('/:id')
  .put(authorize, bodyParser, function(request, response) {
    Beer.findById(request.params.id, function(error, data) {
      if (error) {
        return response.send(error);
      }
      if (data._creator.toString() !== request.headers.creator_id) {
        return response.status(401).json({ message: 'UnauthorizedError: unauthorized object' });
      }
      data.name = request.body.name || data.name;
      data.country = request.body.country || data.country;
      data.save(function(error) {
        if (error) {
          response.send(error);
        }
        return response.status(200).json({ message: 'Beer updated!' });
      });
    });
  })
  .delete(authorize, function(req, response) {
    Beer.remove({
      _id: req.params.id
    }, function(error) {
      if (error) {
        return response.send(error);
      }
      return response.status(200).json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;
