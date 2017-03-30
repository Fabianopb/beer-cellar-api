var express = require('express');
var app = express();

var db = require('./database');

var beers = require('./routes/beers');
app.use('/beers', beers);

db.connect('mongodb://localhost:28018', function(error) {
  if (error) {
    console.log('Could not connect to the database!', error);
  } else {
    db.get().collections(function(error, collections) {
      if (collections.length === 0) {
        db.createCollection('beers');
      }
    });
  }
});

app.use(function(req,res,next){
  req.db = db;
  next();
});

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(3000);
console.log('Listening on port 3000...');
