var express = require('express');
var router = express.Router();

// use_case(s)
var connectionsUseCase = require('../use_cases/connectionUseCases/connections');
var userDataResponseUseCase =
    require('../use_cases/connectionUseCases/createConnectionBlock');
var getUserTablesUseCase = require('../use_cases/userUseCases/getUserTableIds');

function connectionsRouter(connectionRepo, userRepo, postRepo) {
  var connection = connectionsUseCase(connectionRepo, userRepo);
  var getUserTables = getUserTablesUseCase(userRepo, connectionRepo, postRepo);
  var generateBlock = userDataResponseUseCase(userRepo, connectionRepo);
  // Router Types: post
  router.post('/addConnection', function(req, res) { // Post: connection
    console.log('connections: router.post(/addConnection, function(' + req +
                ', ' + res + '))');
    connectionRepo
        .createConnection({userId : req.userId, connectionId : req.body[0]})
        .then(function(sum) {
          return userRepo
              .updateConnections({id : req.userId, connections : sum})
              .then(function() {
                return getUserTables.getAllUserData(req.userId)
                    .then(function(userData) {
                      res.status(200).send({userData : userData}).end();
                    });
              });
        })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });

  router.post('/createSaleGroup', function(req, res) { // Post: saleGroup
    console.log('connections: router.post(/createSaleGroup, function(' + req +
                ', ' + res + '))');
    useCase
        .createNewSalesGroup(req.body[0], req.body[1], req.body[2], req.body[3],
                             req.body[4], req.body[5])
        .then(function(salesGroup) {
          res.status(200).send({groupData : salesGroup}).end();
        })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });
  // End Router Types: post

  // Router Types: get
  router.get('/findUsers', function(req, res) { // Get: users
    console.log('connections: router.get(/findUsers, function(' + req + ', ' +
                res + '))');
    generateBlock.userBlocks(req.userId, req.query)
        .then(function(
            userBlocks) { res.status(200).send({blocks : userBlocks}).end(); })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });

  router.get('/getConnections', function(req, res) { // Get: connections
    console.log('connections: router.get(/getConnections, function(' + req +
                ', ' + res + '))');
    generateBlock.connectionBlocks(req.userId, req.query)
        .then(function(userBlocks) {
          if (!userBlocks) {
            res.status(204).send({blocks : "NULL"}).end();
          }
          res.status(200).send({blocks : userBlocks}).end();
        })
        .catch(function(
            errors) { res.status(400).send({error : error}).end(); });
  });

  router.get('/getAllGroups', function(req, res) {
    console.log('connections: router.get(/getAllGroups, function(' + req +
                ', ' + res + '))')
    useCase.getGroupIds(req.body[0])
        .then(function(
            groupIDs) { res.send({groupIds : groupIDs}).status(200).end(); })
        .catch(function(errors) { res.status(400).end(); });
  });
  // End Router Types: get

  // Router Types: put

  // End Router Types: put

  // Router Types: del
  router.delete('/deleteConnection', function(req, res) {
    console.log('connections: router.delete(/deleteConnection, function(' +
                req + ', ' + res + ')');
    connectionRepo
        .deleteConnection(
            {userId : req.userId, connectionId : req.query.connectionId})
        .then(function(sum) {
          return userRepo
              .updateConnections({id : req.userId, connections : sum})
              .then(function() {
                return getUserTables.getAllUserData(req.userId)
                    .then(function(userData) {
                      res.status(200).send({userData : userData}).end();
                    });
              });
        })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });
  // End Router Types: del
  return router;
}
module.exports = connectionsRouter;
