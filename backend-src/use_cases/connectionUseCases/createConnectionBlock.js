function connectionBlockUseCase(userRepo, connectionRepo) {
  // Block Type Methods
  function userBlocks(id, query) {
    if (query.firstName === '' && query.lastName === '') { // query by role
      return userRepo.findUsersByRole(query.role)
          .then(function(users) {
            return instanceFilter(id, users).then(function(
                resp) { return generateJSON(id, resp); });
          })
          .catch(function(error) { return Promise.reject([ error ]); });
    } else { // specific query
      return userRepo
          .findUsersByQuery(query.role, query.firstName, query.lastName)
          .then(function(userData) { return generateJSON(id, userData); })
          .catch(function(error) {
            console.log('ERROR ' + error);
            return Promise.resolve([ error ]);
          });
    }
  }

  function connectionBlocks(id, query) {
    var parse = JSON.parse(query.connections);

    return userRepo.findUsersWithIds(parse)
        .then(function(users) { return generateJSON(id, users); })
        .catch(function(error) { return Promise.reject(error); });
  }
  // End Block Type Methods

  // UseCase Methods
  function generateJSON(clientId, userData) {
    var Json = {"userBlocks" : {}};
    for (var i in userData) {
      var relUser = userData[i];
      if (relUser.id !== clientId) {
        var blockData = {
          "id" : relUser.id,
          "firstName" : relUser.firstName,
          "lastName" : relUser.lastName,
          "profileImgURL" : relUser.profileImgURL,
          "role" : relUser.role,
          "posts" : relUser.posts,
          "groups" : relUser.groups
        };
        Json.userBlocks['block' + i] = JSON.stringify(blockData);
      }
    }
    console.log('generateJSON(' + Json.userBlocks + ')');
    return Json.userBlocks;
  }

  function instanceFilter(userId, users) {
    console.log('instanceFilter(' + userId + ', ' + users + ')');
    var filter = [];
    return connectionRepo.findConnectionsById(userId)
        .then(function(connections) {
          for (var i in users) {
            var a = users[i].id;
            connections.forEach(function(connection) {
              var b = connection.connectionId;
              if (a === b) {
                filter.push(users[i]);
              }
            });
          }
          for (var i in filter) {
            users.splice(users.indexOf(filter[i]), 1);
          }
          return users;
        })
        .then(function(filteredUsers) {
          console.log('returning: ' + filteredUsers);
          return filteredUsers;
        })
        .catch(function(error) { return Promise.reject(error) });
  }
  // End UseCase Methods
  return {userBlocks : userBlocks, connectionBlocks : connectionBlocks};
}
module.exports = connectionBlockUseCase;
