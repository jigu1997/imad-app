var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article1 = {
    title : 'Article-1 | About',
    heading : 'Article-1',
    date : 'August 11,2017',
    content :` <p>
            This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
            as CSS Files.
            </p>
            <p>
            This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
            as CSS Files.
            </p>`
};

var htmltemplate =
`
<html>
<head>
<title>${title}</title>
<meta name="viewport" content="width-device-width,initial-scale=1" />
<link href="/ui/style.css" rel="stylesheet" />
</head>

<body>
<div class="container">


<div>
<a href="/">Home Page</a><br/>
<a href="/article2">Article-2</a>
</div>
<hr/>
<h3>${heading}</h3>

<div>
${date}
</div>
<hr/>

<div>
<img src="ui/rameswaram.jpg" width="100%" height="50%">
</div>

<div>
${content}
</div>


</div>
</body>
</html>
`;





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article1.html'));
});

app.get('/article2', function (req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article2.html'));
});

app.get('/article3', function (req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article3.html'));
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





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
