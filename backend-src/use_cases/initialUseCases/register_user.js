/*** InitialUseCases: RegisterUserUseCase ***/
const bcrypt = require('bcrypt'), fs = require('fs'), path = require('path');

function registerUserUseCase(userRepo, tokenSvc) {
  function register(userData) {
    return bcrypt.hash(userData.password, 10).then(function(digest) {
      return userRepo.createUser(userData, digest).then(function(user) {
        /*
        if (!path.existsSync(dir)) {
                            fs.mkdirSync(dir, token);
                            var sellerAssets = ['userAssets', 'postAssets',
        'albumAssets', 'saleBlockAssets']; var buyerAssets = ['userAssets',
        'postAssets'];

                            var assets;
                            if (userData.role=='seller') { assets =
        sellerAssets; } else { assets = buyerAssets; }

                            for (var i = 0; i<assets.length; i++) {
                                fs.mkdirSync(dir+'/', assets[i]);
                            }
                        }
                        */
        return {"href" : "http://shopcaster.com"};
      });
    });
  }

  function resetPassword() {}

  // User Profile Methods \\
  function createUserProfile(id) { // Create User Profile
    const token = tokenSvc.issueToken(id),
          dir = path.join(__dirname,
                          '../../public/userProfiles/users/' + id + '.json');
  }

  function wasTempProfileImg() {}
  /*** Export Methods ***/
  return {register : register, resetPassword : resetPassword};
}
/*** End ***/
module.exports = registerUserUseCase;
