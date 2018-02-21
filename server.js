var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = required('crypto');

var app = express();
var Pool = require('pg').Pool;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080;
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
