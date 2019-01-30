/*** routes: authRouter ***/
const express = require('express'), router = express.Router();

// remotePassport
function authRoutes(userRepo, jwtKey, authKeys, passport) {
  // useCases:
  const userloginUseCase = require('../use_cases/initialUseCases/login'),
        loginUseCase = userloginUseCase(userRepo, jwtKey);
  const userDataUseCase = require('../use_cases/userUseCases/updateUser'),
        userUseCase = userDataUseCase(userRepo);
  const authUseCase = require('../use_cases/initialUseCases/remote_auth'),
        passportUseCase = authUseCase(userRepo, authKeys, passport)

  // Router Types: post \\
    router.post('/', function(req, res) { // Login
  console.log('auth: router.post(/, function(' + req.body + ', ' + res + ')');

  console.log('EMAIL: ' + req.email);

  loginUseCase.login(req.body['email'], req.body['password'])
      .then(function(token) { res.send({token : token}).end(); })
      .catch(function(error) {
        console.log('THIS EMAIL IS NOT REGISTERED WITH SHOPCASTER');
        res.status(404).send({error : error}).end();
      });
});

router.post('/logout', function(req, res) { // logout
  console.log('auth: router.post(/logout\', function(' + req + ', ' + res +
              ')');
  userUseCase.stateLog(req.body['email'], false);
  res.status(200).end();
});

// Router Types: get \\
var authFor;
router.use(function(req, res, next) {
  console.log('auth: router.get(/remote, function(' + req + ', ' + res + ')');
  // authFor = req.query.authFor;
  authFor = 'facebook';
  next();
});

router.get('/remote', passport.authenticate(
                          authFor, {scope : [ 'public_profile', 'email' ]}));

router.get('/remote/callback',
           passport.authenticate(
               authFor, {successRedirect : '/profile', failureRedirect : '/'}),
           function(req, res) {

           });

return router;
}
/*** End ***/
module.exports = authRoutes;
