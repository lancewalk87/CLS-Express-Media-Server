/*** routes: userRouter ***/
const express = require('express'), router = express.Router();
const multer = require('multer'), upload = multer({dest : '../public/'});

function usersRouter(userRepo, connectionRepo, postRepo, saleBlockRepo,
                     tokenSvc) {
  // useCases:
  const updateUserUseCase = require('../use_cases/userUseCases/updateUser'),
        userUpdate = updateUserUseCase(userRepo, tokenSvc);
  const getUserTablesUseCase =
      require('../use_cases/userUseCases/getUserTableIds'),
        getUserTables = getUserTablesUseCase(userRepo, connectionRepo, postRepo,
                                             saleBlockRepo);

  // Router Types: get
  router.get('/me', function(req, res) { // Get: userTables
    console.log('users: router.get(/me, function(' + req + ', ' + res + '))');
    getUserTables.getAllUserData(req.userId)
        .then(function(userData) {
          console.log('routes.usersRouter.router.get(\'/me\', function(' + req +
                      ', ' + res + ')');
          res.status(200).send({userData : userData}).end();
        })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });
  // End Router Types: get

  // Router Types: post
  router.post('/updateMe', function(req, res) { // Update User
    console.log('users: router.post(/updateMe, function(' + req + ', ' + res +
                '))');
    userUpdate
        .updateUser(req.body[0], req.body[1], req.body[2], req.body[3],
                    req.body[4], req.body[5], req.body[6], req.body[7],
                    req.body[8])
        .then(function() {

        });
  });

  router.put('/me/streamSession',
             function(req, res) { // Change Live Session State
               console.log('users: router.put(/me/streamSession, function(' +
                           req + ', ' + res + ')');
             });
  // End Router Types: post

  // Router Types: del
  router.delete('/deleteMe', function(req, res) {
    console.log('routes.usersRouter.router.del(\'me\', function(' + req + ', ' +
                res + ')');
    userRepo.deleteUser(req.userId)
        .then(function() { res.status(200).end(); })
        .catch(function(error) { res.status(400).end(); });
  });

  return router;
}
/*** End ***/
module.exports = usersRouter;
