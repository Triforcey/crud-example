var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended: true});
var server = require('http').createServer(app);
var validate = require('./validate.js');

var db = require('./database.js');
db.connect({
  url: process.env.DB_URL,
  dbName: process.env.DB_NAME
}, function () {
  server.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port ${process.env.PORT || 80}!`);
  });
});

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(jsonParser);
app.use(urlParser);

app.use(express.static('public'));

app.get('/', function (req, res) {
  db.getPotatoes(function (potatoes) {
    res.render('index', {
      msg: 'Hello world!',
      potatoes: potatoes
    });
  });
});

app.get('/potatoes', function (req, res) {
  db.getPotatoes(function (potatoes) {
    res.json(potatoes);
  });
});

app.post('/potato', function (req, res) {
  var potato = validate.createPotato(req.body);
  if (!potato) {
    res.status(400).end();
    return;
  }
  db.createPotato(req.body, () => {
    res.redirect('/');
  });
});

app.put('/potato', function (req, res) {
  var potato = validate.replacePotato(req.body);
  if (!potato) {
    res.status(400).end();
    return;
  }
  db.replacePotato(potato, function (err) {
    if (err) {
      res.status(400).end();
      return;
    }
    res.end();
  });
});

app.patch('/potato', function (req, res) {
  var potato = validate.updatePotato(req.body);
  if (!potato) {
    res.status(400).end();
    return;
  }
  db.updatePotato(potato, function (err) {
    if (err) {
      res.status(400).end();
      return;
    }
    res.end();
  });
});

app.delete('/potato', function (req, res) {
  var potato = validate.deletePotato(req.body);
  if (!potato) {
    res.status(400).end();
    return;
  }
  db.deletePotato(potato, function (err) {
    if (err) {
      res.status(400).end();
      return;
    }
    res.end();
  });
});
