/*** Backend: Dependancies ***/
const express = require('express'), sequelize = require('sequelize'),
      url = require('url'), logger = require('morgan');

const path = require('path'), fs = require('fs'),
      multipart = require('connect-multiparty'),
      bodyParser = require('body-parser'),
      sassMiddleware = require('node-sass-middleware'), cors = require('cors'),
      session = require('express-session'), flash = require('connect-flash');

/*** Backend: Main Config ***/
const main = express();
const dataBase = new sequelize('mysql://app:1234@127.0.0.1/backend', {});
dataBase.sync({force : false});

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
  src : path.join(__dirname, '..public'),
  dest : path.join(__dirname, '..public'),
  indentedSyntax : false,
  sourceMap : true
}));

// Data Repositories \\
const userRepository = require('./repos/user_repository'),
      userRepo = userRepository(dataBase);
const postRepository = require('./repos/post_repository'),
      postRepo = postRepository(dataBase);
const connectionRepository = require('./repos/connection_repository'),
      connectionRepo = connectionRepository(dataBase);
const saleBlockRepository = require('./repos/saleBlock_repository'),
      saleBlockRepo = saleBlockRepository(dataBase);
const albumRespository = require('./repos/album_repository'),
      albumRepo = albumRespository(dataBase);

// Data Routers \\
const auth = require('./routes/auth'), users = require('./routes/users'),
      saleBlocks = require('./routes/saleBlocks'),
      register = require('./routes/register'),
      posts = require('./routes/posts'),
      connections = require('./routes/connections'),
      albums = require('./routes/albums');

const remoteAuth = require('./services/authentication/remote/auth'),
      authKeys = remoteAuth;

// Services \\
const tokenService =
    require('./services/authentication/local/token_service.js'),
      tokenSvc = tokenService('12345');
const stripeService =
    require('./services/transactions/stripe/stripe_service.js'),
      stripeSvc = stripeService();
const appBackendService = require('./services/app_backend_service');

// Feat. Config. \\
var passport = require('passport');
require('./services/authentication/remote/remote_auth.js')(userRepo, tokenSvc,
                                                           authKeys, passport);

main.use('/auth', auth(userRepo, tokenSvc, authKeys, passport));
main.use('/register', register(userRepo, tokenSvc, authKeys));

main.use(function(req, res, next) { // Authenticate User
  var token = req.headers['x-user-token'];
  if (token) {
    tokenSvc.verifyToken(token)
        .then(function(userId) {
          req.userId = userId;
          next();
        })
        .catch(function() {
          res.status(401).send({error : 'Invalid/Expired token'});
        });
  } else {
    res.status(401).send({error : 'Authentication required'});
  }
});

main.use('/users',
         users(userRepo, connectionRepo, postRepo, saleBlockRepo, tokenSvc));
main.use('/posts', posts(postRepo, userRepo, connectionRepo));
main.use('/connections', connections(connectionRepo, userRepo, postRepo));
main.use('/saleBlocks', saleBlocks(saleBlockRepo));
main.use('/albums', albums(albumRepo));

// Error Handling \\
main.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});
// ======
main.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

/*** Global Methods ***/
function verifyClient(info, cb) {
  var queryParams = url.parse(info.req.url, true).query;
  console.log("params\n", JSON.parse(queryParams.client).token);

  tokenSvc.verifyToken(JSON.parse(queryParams.client).token)
      .then(userRepo.findUser)
      .then(function(user) {
        info.req.user = queryParams.client;
        info.req.clientType = queryParams.clientType;
        cb(true);
      })
      .catch(function(err) {
        console.log("Error while verifying client", err);
        cb(false, 401, 'Unauthorized');
      });
}

/*** End ***/
console.log('backend: main');

module.exports = {
  main : main,
  wsHandler : appBackendService().main,
  verifyClient : verifyClient
};
