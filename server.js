var express = require('express');
var app = express();

var mongo = require('mongodb');

var MongoServer = mongo.Server;
var MongoDb = mongo.Db;

var server = new MongoServer('localhost', 28018, {auto_reconnect: true});
var db = new MongoDb('beerdb', server);

db.open(function(error, database) {
    if (error) {
        console.log('Cannot connect to the database!', error);
    } else {
        console.log('Successfully connected to the database', database.s.databaseName);
    }
});

app.get('/', function(request, response) {
    response.send('Hello World!');
});
app.get('/beers', function(request, response) {
    response.send('No beers in the database yet!');
});

app.listen(3000);
console.log('Listening on port 3000...');
