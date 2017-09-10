var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : 'SomeRandomSecretValue',
    cookie : {maxAge : 1000 * 60 *5}
}));

var config = {
    user : 'jigu1997',
    database : 'jigu1997',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
}

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
    <link rel="icon" href="/ui/rameswaram.jpg"/>
    <meta name="viewport" content="width-device-width,initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
    <div class="container">
    
    
    <div>
    <a href="/">Home Page</a><br/>
    <a href="/articles/${link}">${link}</a>
    </div>
    <hr/>
    <h3>${heading}</h3>
    
    <div>
    ${date.toDateString()}
    </div>
    <hr/>
    
    <div>
    <img src="ui/${image.toString()}.jpg" width="100%" height="50%">
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

function hash(input,salt){
  //create hash
  var hashed = crypto.pbkdf2Sync(input,salt,100000,512,'sha512');
  //return hash
  return ['pbkdf2',10000,salt,hashed.toString('hex')].join('%');
    
}

app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this is a random salt');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err , result){
        if(err){
          res.status(500).send(err.toString());
      }else{
          res.send('User Created Successfully :'+username);
      }
    });
});

app.post('/login',function(req, res){ 
    
    var username = req.body.username;
    var password = req.body.password;

    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err , result){
        if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length===0){
              res.status(403).send("Username / Password is Invalid");
          }
          else{
              var dbString = result.rows[0].password;
              var salt = dbString.split('%')[2];
              var hashedPassword = hash(password,salt);
              if(hashedPassword==dbString){
                  
                  //Set Session
                  req.session.auth = {userId:result.rows[0].id};
                  //set a cookie from session id
                  
                  res.send('Welcome User : '+username);
              }else{
                   res.status(403).send("Password is Invalid");
              }
          }
          
      }
    });
    
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send("You are logged in.Session is running "+req.session.auth.userId.toString());
    }else{
        res.send("Session Expired.Login again");
    }
});

app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send("Logged out");
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  //make select request
  pool.query('SELECT * FROM test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result.rows));
      }
  });
  //return response with result
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var names =[];
app.get('/submit-name', function(req, res){
 
 //get the name   
 var name = req.query.name;
 
 names.push(name);
 
 //JSON
 res.send(JSON.stringify(names));
 
});

app.get('/articles/:articleName', function (req, res) {
  
  var articlename = req.params.articleName;
  pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length===0){
              res.status(404).send('Article not found');
          }else{
              var articleData = result.rows[0];
              res.send(createtemplate(articleData));
          }
      }
  });
  
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter+1; 
  res.send(counter.toString());
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/articles/ui/he.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'he.jpg'));
});

app.get('/articles/ui/rameswaram.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'rameswaram.jpg'));
});

app.get('/articles/ui/theme.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'theme.jpg'));
});

app.get('/ui/home.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
