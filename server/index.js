const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  router = require('./router'),
  config = require('./config/main');

const server = app.listen(config.port)
console.log("Your server is running on port " + config.port + '.');


// Middleware

app.use(logger('dev')) // Log request to API using Morgan

// Deal with CORS craziness here
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Parse JSON responses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB conf/Connection
const db = mongoose.connect(config.database,{
  useMongoClient: true
});

db.on('error', console.error.bind(console, 'connection error:'));

router(app);