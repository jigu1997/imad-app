var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    
   'article1' : {
    title : 'Article-1 | About',
    heading : 'Article-1',
    date : 'August 11,2017',
    link : 'article2',
    image : 'rameswaram',
    content :` <p>
            This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
            as CSS Files.
            </p>
            <p>
            This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
            as CSS Files.
            </p>`
},
   'article2' : {
    title : 'Article-2 | About',
    heading : 'Article-2',
    date : 'September 12,2017',
    link : 'article3',
    image : 'theme',
    content :` <p>
        This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
        as CSS Files.---Article2..
        </p>`
            
  },
   'article3' : {
    title : 'Article-3 | About',
    heading : 'Article-3',
    date : 'October 11,2017',
    link : 'article1',
    image : 'home',
    content :` <p>
        This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
        as CSS Files.---Article3 content is displayed in this paragraph..
        </p>`
  },
  'article4' : {
    title : 'Article-3 | About',
    heading : 'Article-3',
    date : 'October 11,2017',
    link : 'article1',
    image : 'home',
    content :` <p>
        This is just a sample content to be displayed on the browser to understand how the browser renders HTML as well
        as CSS Files.---Article3 content is displayed in this paragraph..
        </p>`
  }
  
  
};


function createtemplate(data){
    
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var link = data.link
    var image = data.image
    
    
    var htmltemplate =
    `
    <html>
    <head>
    <title>${title}</title>
    <link rel="apple-touch-icon" sizes="57x57" href="/ui/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/ui/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/ui/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/ui/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/ui/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/ui/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/ui/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/ui/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/ui/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/ui/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/ui/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/ui/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/ui/favicon-16x16.png">
    <link rel="manifest" href="/ui/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ui/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="viewport" content="width-device-width,initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
    <div class="container">
    
    
    <div>
    <a href="/">Home Page</a><br/>
    <a href="/${link}">${link}</a>
    </div>
    <hr/>
    <h3>${heading}</h3>
    
    <div>
    ${date}
    </div>
    <hr/>
    
    <div>
    <img src="ui/${image}.jpg" width="100%" height="50%">
    </div>
    
    <div>
    ${content}
    </div>
    
    
    </div>
    </body>
    </html>
    `;
    
    return htmltemplate;
}





app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articlesparameter', function (req, res) {
  
  var articlename = req.params.articlesparameter;
  res.send(createtemplate(articles[articlename]));
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

app.get('/ui/theme.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'theme.jpg'));
});

app.get('/ui/home.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/favicon-32x32.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon-32x32.png'));
});

app.get('/ui/manifest.json', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'manifest.json'));
});

app.get('/ui/ms-icon-144x144.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ms-icon-144x144.png'));
});

app.get('/ui/favicon-96x96.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon-96x96.png'));
});

app.get('/ui/favicon-16x16.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon-16x16.png'));
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
