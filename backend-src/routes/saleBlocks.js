var express = require('express');
var router = express.Router();

// Router Use_Cases
var saleBlockUseCase =
    require('../use_cases/saleBlockUseCases/saleBlockUseCase');
var getUserTablesUseCase = require('../use_cases/userUseCases/getUserTableIds');

// SALEBLOCKS REPO ROUTES
function saleBlocksRouter(userRepo, saleBlockRepo) {
  var saleBlock = saleBlockUseCase(userRepo, saleBlockRepo);
  var getUserTables = getUserTablesUseCase(userRepo, saleBlockRepo);
  // Router Types: post
  router.post('/saleBlock', function(req, res) {
    console.log('saleBlocks: router.post(/saleBlock, function(' + req + ', ' +
                res + '))');
    saleBlock.createSaleBlock(req.userId, req.body)
        .then(function(data) {
          return userRepo
              .updateSaleBlocks({id : req.userId, saleBlocks : data.sum})
              .then(function() {
                return getUserTables.getAllUserData(req.userId)
                    .then(function(userData) {
                      res.status(200).send({userData : userData}).end();
                    });
              });
        })
        .catch(function(error) { res.status(400).send({error : error}).end(); })
  });
  // End Router Types: post

  // Router Types: get

  // End Router Types: get

  // Router Types: put

  // End Router Types: put

  // Router Types: del

  // End Router Types: del
  return router;
}
// END SALEBLOCKS REPO ROUTES
module.exports = saleBlocksRouter;
