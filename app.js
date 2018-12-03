var app = require('express')();
var fs = require('fs');
var helmet = require('helmet');
var http = require('http').Server(app);
var express = require('express');
var bodyParser = require('body-parser');
var burgers = require('./burgers/burgers_rest.js');
var multer = require('multer');
var mongo = require('mongodb');
var monk = require('monk');

const db = monk('mongo:27017/burgers');

db.then(() => {
  console.log('Connected to burgers database');
});

function REST() {
  this.configureExpress(db);
}

REST.prototype.configureExpress = function(db) {

  app.use(function(req, res, next) {
    req.db = db;
    next();
  });

  app.use(bodyParser.json());
  app.use(helmet());
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Vary', 'Accept-Encoding');
    next();
  });

  const router = express.Router();
  app.use('/api', router);

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.use(express.static('public/modules/'));
  app.use(express.static('public/styles/'));
  app.use(express.static('public/assets/img/'));

  const burgers_router = new burgers(router, db);
  this.startServer();
};

REST.prototype.startServer = () => {
  app.listen(8080, function() {
    console.log('Burger server listening on port 8080...');
  });
};

REST.prototype.stop = err => { app.exit(1); };

new REST();
