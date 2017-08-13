var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article1.html'));
});

app.get('/article2', function (req, res){
   res.send("Article two has been requested ");
});

app.get('/article3', function (req, res){
   res.send("Article three has been requested ");
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/rameswaram.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rameswaram.jpg'));
});

app.get('/ui/home.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

app.get('/ui/homebg.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'homebg.jpg'));
});

app.get('/ui/frames.gtml', function(req , res){
    res.sendFile(path.join(_dirname,'ui','frames.html'));
    
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
