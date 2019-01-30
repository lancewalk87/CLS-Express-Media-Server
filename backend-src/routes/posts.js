var express = require('express');
var router = express.Router();

// Router Use_Cases
var postUseCase = require('../use_cases/postsUseCases/posts');
var postResponseUseCase = require('../use_cases/postsUseCases/postResponse');
var getUserTablesUseCase = require('../use_cases/userUseCases/getUserTableIds');

// POST REPO ROUTES
function postsRouter(postRepo, userRepo, connectionRepo) {
  var post = postUseCase(postRepo, userRepo);
  var getUserTables = getUserTablesUseCase(userRepo, connectionRepo, postRepo);
  var generateBlock = postResponseUseCase(postRepo, userRepo, connectionRepo);

  // Router Types: get
  router.get('/getFeed', function(req, res) { // return feed posts
    console.log('posts: router.get(/getFeed, function(' + req + ', ' + res +
                '))');
    generateBlock.feedBlocks(req.userId, req.query)
        .then(function(
            postBlocks) { res.status(200).send({blocks : postBlocks}).end(); })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });

  router.get('/getPosts', function(req, res) { // return owned posts
    console.log('posts: router.get(/getPosts, function(' + req + ', ' + res +
                '))');
    generateBlock.postBlocks(req.userId, req.query)
        .then(function(postBlocks) {
          if (!postBlocks) {
            res.status(204).send({blocks : 'NULL'}).end();
            console.log('NULL');
          }
          res.status(200).send({blocks : postBlocks}).end();
        })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });
  // End Router Types: get

  // Router Types: post
  router.post('/newPost', function(req, res) {
    console.log('posts: router.post(/newPost, function(' + req + ', ' + res +
                '))');
    post.createPost(req.userId, req.body)
        .then(function(data) {
          return userRepo.updatePosts({id : req.userId, posts : data.sum})
              .then(function() {
                return getUserTables.getAllUserData(req.userId)
                    .then(function(userData) {
                      res.status(200)
                          .send({userData : userData, postData : data})
                          .end();
                    });
              });
        })
        .catch(function(
            error) { res.status(400).send({error : error}).end(); });
  });
  // End Router Types: post

  // Router Types: put
  router.put('/updatePost', function(req, res) { // modify existing post
    console.log('posts: router.put(/:id\, function(' + req + ', ' + res + '))');
    post.updatePost(req.userId, req.query)
        .then(function() {
          return userRepo.updatePosts({id : req.userId, posts : data.sum})
              .then(function() {
                return getUserTables.getAllUserData(req.userId)
                    .then(function(userData) {
                      res.status(200).send({userData : userData}).end();
                    });
              });
        })
        .catch(function(
            errror) { res.status(400).send({error : error}).end(); });
  });
  // End Router Types: put

  // Router Types: del
  router.delete('/:id', function(req, res) { // delete existing post
    console.log('posts: router.delete(/:id\, function(' + req + ', ' + res +
                '))');
    postRepo.deletePost(req.userId, req.query.postId).then(function() {
      return userRepo.updatePosts({id : req.userId, posts : data.sum})
          .then(function() {
            return getUserTables.getAllUserData(req.userId)
                .then(function(userData) {
                  res.status(200).send({userData : userData}).end();
                });
          });
    });
  });
  // End Router Types: del

  return router;
}
// END POST REPO ROUTES
module.exports = postsRouter;
