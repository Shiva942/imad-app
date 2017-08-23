var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = required('crypto');

var app = express();
var Pool = require('pg').Pool;

var config ={
    user : 'shivanshmathur',
    database : 'shivanshmathur',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DINCHAK
};
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db', function (req, res)
{
    //make a select request
    // return a response with the results
    pool.query("SELECT * FROM test", function(err,result){
        if(err)
        {
            res.status(500).send(err.toString())
        }
    })
    
});

function hash(input,salt)
{
    var hashedString = crypto.pbkdf2Sync( input, salt, 100000, 512, 'sha512');
    return [ "pbkdf2Sync", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash-input', function (req,res){
    var hashedString = hash(req.params.input , 'This-is-some-random-string')
    res.send(hashedString);
});

app.get('/article-one', function (req,res){
    res.send('Articleone');
});

app.get('/article-two', function (req,res){
    res.send('Article Two');
});

app.get('/article-three', function (req,res){
    res.send('Article Three');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
