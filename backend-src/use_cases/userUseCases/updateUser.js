var bcrypt = require('bcrypt');

function updateUser(userRepo, tokenSvc) {
  function updateUser(firstName, lastName, day, month, year, address1, postCode,
                      city, state) {
    return userRepo.updateUserData({
      firstName : firstName,
      lastName : lastName,
      profileImgURL : imgURL,
      month : month,
      day : day,
      year : year,
      address1 : address1,
      postCode : postCode,
      city : city,
      state : state
    });
  }
  return {updateUser : updateUser};
}
module.exports = updateUser;
