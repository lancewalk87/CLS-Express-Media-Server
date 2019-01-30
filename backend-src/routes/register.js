/*** routes: registrationRouter ***/
const express = require('express'), router = express.Router();
const path = require('path'), validateEmail = require('email-validator');

function registerRouter(userRepo, jwtKey, authKeys) {
  // useCases:
  const emailUseCase =
      require('../use_cases/initialUseCases/emailVerification'),
        verifyEmail = emailUseCase(authKeys);
  const registerUserUseCase =
      require('../use_cases/initialUseCases/register_user'),
        useCase = registerUserUseCase(userRepo, jwtKey);

  // Router Types: post \\
    router.post('/verify', function(req, res) {
  console.log('register: router.post(/verify, function(' + req.body + ', ' +
              res + '))');
  userRepo.findUserByEmail(req.body[9]).then(function(queryRes) {
    if (queryRes)
      return res.status(301)
          .send({resp : 'This email has already been registered'})
          .end();
    if (!validateEmail.validate(req.body[6]))
      return res.status(400).send({resp : 'This email is invalid'}).end();

    return verifyEmail.initSMTPTransport(req.body)
        .then(function(
            enc_id) { res.status(200).send({tempId : enc_id}).end(); })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });
});

router.post('/restPassword', function(req, res) {
  console.log('register: router.post(/restPassword, function(' + req + ', ' +
              res + '))');
  useCase.resetPassword()
      .then(function(user) { res.send({user : user}).end(); })
      .catch(function(error) { res.status(422).send({errors : error}).end(); });
});

// Router Types: get \\
router.get('/complete', function(req, res) {
  console.log('register: router.use(/complete, function(' + req.query.id +
              ', ' + res + '))');

  verifyEmail.readUserTemp(req.query.id)
      .then(function(userData) {
        console.log('USERDATA::: ' + JSON.stringify(userData));
        useCase.register(userData).then(function(
            redirect) { res.redirect(301, redirect.href); });
      })
      .catch(err => {
        console.log('FAIL: ' + err);
        res.status(500).end();
      });
});

return router;
}
/*** End ***/
module.exports = registerRouter;
