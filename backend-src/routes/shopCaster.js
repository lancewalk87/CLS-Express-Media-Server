var express = require('express');
var router = express.Router();

var path = require('path');
var ejs = require('ejs');

function shopCasterRouter(views) {
  var getPath = function(
      viewName) { return path.join(__dirname, views + viewName); };

  router.get('/', function(req, res, next) {
    // req.query? = page
    console.log('routes.shopCasterRouter.router.get(\'/\', function(' +
                JSON.stringify(req.query) + ', ' + res + ', next)');
    res.status(200).render(
        'verification',
        {Email : 'walkerlance65@gmail.com', Name : 'Lance Walker'});
  });
  return router;
}
module.exports = shopCasterRouter;
