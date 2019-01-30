/*** Frontend: Dependancies ***/
const express = require('express'), url = require('url'),
      logger = require('morgan');

const path = require('path'), fs = require('fs'),
      multipart = require('connect-multiparty'),
      bodyParser = require('body-parser'),
      sassMiddleware = require('node-sass-middleware'), cors = require('cors'),
      session = require('express-session'), flash = require('connect-flash'),
      useragent = require('express-useragent');

/*** Frontend: Main Config ***/
const main = express();
main.set("view engine", "ejs");

const Backend = require('../backend/backend.js'), backend = Backend.main;

// Middleware \\
main.use(logger('dev'));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended : false}));
main.use(cors({
  origin : '*',
  methods : 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue : false,
  optionsSuccessStatus : 204,
  exposedHeaders : [ 'Location' ]
}));
main.use(sassMiddleware({
  src : path.join(__dirname, 'public'),
  dest : path.join(__dirname, 'public'),
  indentedSyntax : false,
  sourceMap : true
}));
main.use(express.static(path.join(__dirname, 'public')));
main.use(useragent.express());

// Services \\

// Router \\
main.use('/', function(req, res) {
  console.log('main.use(/, function(' + req + ', ' + res + ')');
  res.render(path.join(__dirname, 'build', 'index.html')).end();
});

// Error Handling \\
main.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

main.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

/*** End ***/
console.log('frontend: main');

module.exports = {
  main : main
};
