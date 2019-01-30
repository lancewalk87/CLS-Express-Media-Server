function getUserTableIdsUseCase(userRepo, connectionRepo, postRepo,
                                saleBlockRepo) {
  function getTableData(table, userId) {
    console.log('getTableData(' + table + ', ' + userId + ')');
    if (!table) {
      return getAllUserData(userId);
    }
  }

  // Table Methods
  var userData = {
    "userTables" : {
      "user" : {},
      "connections" : {},
      "groups" : {},
      "posts" : {},
      "feedItems" : {},
      "saleBlocks" : {}
    }
  };
  function getAllUserData(userId) {
    return userRepo.findUserById(userId)
        .then(function(data) {
          userData.userTables.user = {
            id : data.id,
            firstName : data.firstName,
            lastName : data.lastName,
            profileImgURL : data.profileImgURL,
            day : data.day,
            month : data.month,
            year : data.year,
            address1 : data.address1,
            postCode : data.postCode,
            city : data.city,
            state : data.state,
            email : data.email,
            role : data.role,
            connections : data.connections,
            groups : data.groups,
            posts : data.posts,
            schedule : data.schedule,
            userBio : data.userBio,
            date : data.date
          };
          return userData;
        })
        .then(function(userData) {
          return connectionRepo.findConnectionsById(userId).then(function(
              data) {
            userData.userTables.connections =
                returnTableIds(data, 'connection');
            return userData;
          });
        })
        .then(function(userData) {
          return postRepo.findPostsById(userId).then(function(data) {
            userData.userTables.posts = returnTableIds(data, 'post');
            return userData;
          });
        })
        .then(function(userData) {
          return postRepo.findAllPostIds(userData.userTables.connections)
              .then(function(data) {
                userData.userTables.feedItems = returnTableIds(data, 'feed');
                return userData.userTables;
              });
        })
        .catch(function(error) { return Promise.reject(error); });
  }
  // End Table Methods

  // UseCase Methods
  function returnTableIds(tableData, tableId) {
    switch (tableId) {
    case 'connection':
      var Ids = {"ids" : {}};
      for (var i in tableData) {
        Ids.ids['connection' + i] = JSON.parse(tableData[i].connectionId);
      }
      return Ids.ids;
      break;
    case 'post':
      var posts = [];
      // var Ids={"ids":{}};
      for (var i in tableData) {
        posts.push(tableData[i]);
      }
      // for (var i in tableData) {
      // Ids.ids['post'+i]=JSON.parse(tableData[i].postId); }
      return posts;
      break;
    case 'feed':
      var sortObj = [];
      for (var i in tableData) {
        for (var j in tableData[i]) {
          sortObj.push(tableData[i][j]);
        }
      }
      sortObj.sort(sortbyDate);
      return sortObj;
    default:
      break;
    }
  }

  function sortbyDate(a, b) {
    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  }
  // End UseCase Methods
  return {getTableData : getTableData, getAllUserData : getAllUserData};
}
module.exports = getUserTableIdsUseCase;
