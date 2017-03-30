var express = require('express');
var app = express();

// var bodyParser = require('body-parser');
// var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var mongoClient = require('mongodb').MongoClient;
var db;

mongoClient.connect('mongodb://localhost:28018', function(error, database) {
    if (error) {
        console.log('Could not connect to the database!', error);
    } else {
        db = database;
        db.collections(function(error, collections) {
            if (collections.length === 0) {
                db.createCollection('beers');
            }
        });
    }
});

app.get('/', function(request, response) {
    response.send('Hello World!');
});
app.get('/beers', function(request, response) {
    db.collection('beers', function(error, collection) {
        collection.find().toArray(function(error, documents) {
            response.json(documents);
        });
    });
});

app.listen(3000);
console.log('Listening on port 3000...');
