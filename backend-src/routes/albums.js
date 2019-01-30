var express = require('express');
var router = express.Router();

function albumRouter() {
  // POST Methods
  router.post('newAlbum', function(req, res) {
    console.log('album: router.post(newAlbum, function(' + req + ', ' + res +
                '))');
  });

  router.post('newTemplate', function(req, res) {
    console.log('album: router.post(newTemplate, function(' + req + ', ' + res +
                '))');
  });
  // End POST Methods

  // GET Methods
  router.get('albums', function(req, res) {
    console.log('album: router.get(albums, function(' + req + ', ' + res +
                '))');
  });

  // End GET Methods

  // PUT Methods
  router.put('updateAlbum', function(req, res) {
    console.log('album: router.put(updateAlbum, function(' + req + ', ' + res +
                '))');
  });

  router.put('updateTemplate', function(req, res) {
    console.log('album: router.put(updateTemplate, function(' + req + ', ' +
                res + '))');
  });
  // End PUT Methods

  // DELETE Methods
  router.delete('/', function(req, res) {
    console.log('album: router.delete(/, function(' + req + ', ' + res + '))');
  });
  // End DELETE Methods
  return router;
}
module.exports = albumRouter;
