/*** InitialUseCases: loginUseCase ***/
const bcrypt = require('bcrypt');

function loginUseCase(userRepo, tokenSvc) {
  function login(email, password) {
    console.log('email: ' + email + ', password: ' + password);
    var pwIsCorrect = true;
    return userRepo.findUserByEmail(email)
        .then(function(user) {
          return bcrypt.compare(password, user.password)
              .then(function(isCorrect) {
                pwIsCorrect = isCorrect;
                if (isCorrect) {
                  return tokenSvc.issueToken(user.id);
                }
              });
        })
        .catch(function(err) {
          var errMsg = '';
          if (!pwIsCorrect)
            errMsg = 'Incorrect username or password.';
          else
            errMsg = 'This email is not registered with ShopCaster.';
          return Promise.reject([ errMsg ]);
        });
  }

  function logout(email, password) { console.log('logout'); }

  // Export Methods \\
  return {login : login, logout : logout};
}
/*** End ***/
module.exports = loginUseCase;
