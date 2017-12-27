var code = require('./code.js');
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  console.log("/ is called on server");
  res.sendFile(path.join(__dirname + '/basics/index.html'));
});


console.log("Opening the server");
app.listen(8080);
console.log('TECHIO> open -p 8080 /');
console.log("Server opened");