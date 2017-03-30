var express = require('express');
var app = express();

var mongoose = require('mongoose');

var beers = require('./routes/beers');
app.use('/beers', beers);

mongoose.connect('mongodb://localhost:28018');

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(3000);
console.log('Listening on port 3000...');
