var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended: true});
var server = require('http').createServer(app);

var db = require('./database.js');
db.connect({
  url: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pwd: process.env.DB_PWD
}, function () {
  server.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port ${process.env.PORT || 80}!`);
  });
});

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(jsonParser);
app.use(urlParser);

app.get('/', function (req, res) {
  var potatoes = db.getPotatoes(function (potatoes) {
    res.render('index', {
      msg: 'Hello world!',
      potatoes: potatoes
    });
  });
});

app.post('/potatoes', function (req, res) {
  db.createPotato(req.body, () => {
    res.redirect('/');
  });
});
