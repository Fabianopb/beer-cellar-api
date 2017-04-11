var jwt = require('express-jwt');

var authorize = jwt({
  secret: process.env.BEER_CELLAR_KEY,
  userProperty: 'payload'
});

module.exports = authorize;
