/*** User Repository ***/
const Sequelize = require('sequelize');

function userRepository(seq) {
  // User Tables \\
    const Users = seq.define('user', { // User Table
  // meta:
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      socialId: Sequelize.INTEGER, socialToken: Sequelize.STRING,
      deviceTokens: Sequelize.STRING,
      // visible:
      fullName: Sequelize.STRING, profileImgURL: Sequelize.STRING,
      birthDate: Sequelize.DATE, address1: Sequelize.STRING,
      postCode: Sequelize.INTEGER, city: Sequelize.STRING,
      state: Sequelize.STRING, email: Sequelize.STRING,
      password: Sequelize.STRING, passwordDigest: Sequelize.STRING,
      isSeller: Sequelize.BOOLEAN, isStreaming: Sequelize.BOOLEAN,
      userBio: Sequelize.TEXT,
      connections: {type: Sequelize.INTEGER, defaultValue: 0},
      groups: {type: Sequelize.INTEGER, defaultValue: 0},
      posts: {type: Sequelize.INTEGER, defaultValue: 0}, status: {
        type: Sequelize.ENUM('active', 'inactive', 'live'),
        defaultValue: 'inactive'
      }
});

const userRatings = seq.define('userRatings', {
  // Ratings Table
  // meta:
  rxId : Sequelize.INTEGER,
  txId : Sequelize.INTEGER,
  // visible:
  ratingNum : Sequelize.INTEGER,
  ratingComment : Sequelize.TEXT,
  ratingImg : Sequelize.STRING
});

// ===> Production Testing

// ===> End: Production Testing

// Users: data \\
function createUser(userData, digest) { // New User
  console.log('repos.userRepo.createUser(' + userData + ')');
  return Users
      .create({
        fullName : userData.fullName,
        profileImgURL : userData.profileImgURL,
        birthDate : userData.birthDate,
        address1 : userData.address1,
        postCode : userData.postCode,
        city : userData.city,
        state : userData.state,
        email : userData.email,
        password : userData.password,
        passwordDigest : digest,
        isSeller : userData.role
      })
      .then(function(user) { return user; });
}

function updateUser(data) {
  console.log('repos.userRepo.updateUserData(' + data + ')');
  return Users.update({where : {id : data.id}});
}

function deleteUser(data) {
  console.log('repos.userRepo.deleteUser(' + id + ')');
  return Users.destroy({where : {id : id}});
}

// Users: query \\
    function findUserById(id) {
console.log('repos.userRepo.findUserById(' + id + ')');
// return Users.findOne({where: {id: id}}).then(function(userData) { return
// userData; });
return Users.findOne({where : {id : id}});
}

function findUsersWithIds(ids, query) {
  console.log('repos.userRepo.findUsersWithIds(' + ids + ', ' + query + ')');
  var ids = ids;
  return seq
      .transaction(function(j) {
        var actions = [];
        for (var i in ids) {
          var searchPromise =
              Users.findOne({where : {id : ids[i]}}, {transaction : j});
          actions.push(searchPromise);
        };
        return Promise.all(actions);
      })
      .then(function(users) { return users; })
      .catch(function(error) { return Promise.reject([ error ]); });
}

function findUserByEmail(email) {
  console.log('repos.userRepo.findUserByEmail(' + email + ')');
  return Users.findOne({where : {email : email}})
      .then(function(userData) { return userData; });
}

/*** Export Methods ***/
return {
  createUser : createUser,
  updateUser : updateUser,
  deleteUser : deleteUser,

  findUserById : findUserById,
  findUsersWithIds : findUsersWithIds,
  findUserByEmail : findUserByEmail
};
}
/*** End ***/
module.exports = userRepository;
