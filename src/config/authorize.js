var jwt = require('express-jwt');

var authorize = {};

authorize.token = jwt({
  secret: process.env.BEER_CELLAR_KEY,
  userProperty: 'payload'
});

authorize.userId = function(userId, response) {
  if (!userId) {
    return response.status(401).json({ message: 'UnauthorizedError: private profile' });
  }
};

module.exports = authorize;
