var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.send('Hello World!');
});
app.get('/beers', function(request, response) {
    response.send('No beers in the database yet!');
});

app.listen(3000);
console.log('Listening on port 3000...');
