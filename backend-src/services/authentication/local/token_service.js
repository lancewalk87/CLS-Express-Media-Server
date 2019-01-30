/*** Token Service: Dependancies ***/
const jwt = require('json-web-token');

function tokenService(jwtKey) {
  // Token Methods \\
  function issueToken(userId) {
    return new Promise(function(resolve, reject) {
      jwt.encode(jwtKey, {sub : userId, iat : Date.now()},
                 function(err, token) {
                   if (err)
                     reject(err);
                   else
                     resolve(token);
                 });
    });
  }

  function verifyToken(token) {
    return new Promise(function(resolve, reject) {
      jwt.decode(jwtKey, token, function(err, data) {
        if (!err)
          resolve(data.sub);
        else
          reject();
      });
    });
  }

  // Export Methods \\
  return {issueToken : issueToken, verifyToken : verifyToken};
}
/*** End ***/
module.exports = tokenService;
