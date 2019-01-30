var Sequelize = require("sequelize");
var DataTypes = require("sequelize/lib/data-types");

// CONNECTION REPOSISTORY
function connectionRepository(seq) {
  // Connection Repos
  var pendingConnections = seq.define('pending', {
    // client<->cleint request
    OwnerId : {type : Sequelize.INTEGER},      // Owner Id
    connectionId : {type : Sequelize.INTEGER}, // Connection Id
    date :
        {type : Sequelize.DATE, allowNull : false, defaultValue : DataTypes.NOW}
  });

  var Connections = seq.define('connection', {
    // client<->client connection
    OwnerId : {type : Sequelize.INTEGER},      // Owner Id
    connectionId : {type : Sequelize.INTEGER}, // Connection Id
    date :
        {type : Sequelize.DATE, allowNull : false, defaultValue : DataTypes.NOW}
  });

  var saleGroups = seq.define('saleGroup', {
    // seller->buyer group
    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true},
    groupId : {type : Sequelize.INTEGER}, // Owner Id
    groupName : {type : Sequelize.STRING},
    groupDescription : {type : Sequelize.STRING},
    groupType : {type : Sequelize.STRING},
    groupMembers : {type : Sequelize.INTEGER},
    date :
        {type : Sequelize.DATE, allowNull : false, defaultValue : DataTypes.NOW}
  });

  var saleGroupCatergories = seq.define('saleGroupCatergories', {
    // group affilated catergories
    groupId : {type : Sequelize.INTEGER, primaryKey : true},
    catergoryString : {type : Sequelize.STRING}
  });

  var saleGroupRatings = seq.define('saleGroupRatings', {
    // group ratings
    groupId : {type : Sequelize.INTEGER, primaryKey : true},
    raterId : {type : Sequelize.INTEGER},
    ratingInt : {type : Sequelize.INTEGER},
    ratingComment : {type : Sequelize.STRING},
    ratingImg : {type : Sequelize.STRING},
    date :
        {type : Sequelize.DATE, allowNull : false, defaultValue : DataTypes.NOW}
  });

  var saleGroupMembers = seq.define('saleGroupMembers', {
    // group members
    groupId : {type : Sequelize.INTEGER, primaryKey : true},
    memberId : {type : Sequelize.INTEGER},
    isAdmin : {type : Sequelize.BOOLEAN},
    date :
        {type : Sequelize.DATE, allowNull : false, defaultValue : DataTypes.NOW}
  });
  // End Connection Repos

  // Connection Repo Table Methods
  function createConnection(connectionData) { // create connection
    return Connections
        .create({
          OwnerId : connectionData.userId,
          connectionId : connectionData.connectionId
        })
        .then(function(connection) {
          return findConnectionsById(connection.OwnerId)
              .then(function(data) { return Object(data).length; });
        });
  }

  function deleteConnection(connectionData) { // delete connection by id
    console.log('repos.connectionRepo.deleteConnection(' + connectionData +
                ')');
    return Connections
        .destroy({
          where : {
            OwnerId : connectionData.userId,
            connectionId : connectionData.connectionId
          }
        })
        .then(function(connection) {
          return findConnectionsById(connectionData.userId)
              .then(function(data) { return Object(data).length; });
        });
  }
  // End Connection Repo Table Methods

  // Connection Repo Query Methods
  function findConnectionsById(userId) {
    console.log('repos.connectionRepo.findConnectionsById(' + userId + ')');
    return Connections.findAll({where : {OwnerId : userId}});
  }
  // End Connection Repo Query Methods

  // SaleGroup Repo Table Methods
  function createSaleGroup(groupData) {
    console.log('repos.connectionRepo.createSaleGroup(' + groupData.groupId +
                ', ' + groupData.groupName + ', ' + groupData.groupDescription +
                ', ' + groupData.groupType + ', ' + groupData.groupRating +
                ', ' + groupData.groupMembers + ')');
    saleGroups.create({
      groupId : groupData.groupId,
      groupName : groupData.groupName,
      groupDescription : groupData.groupDescription,
      groupType : groupData.groupType,
      groupRating : groupData.groupRating,
      groupMembers : groupData.groupMembers
    });
  }

  function updateSaleGroupData(groupId, groupData) {
    console.log('repos.connectionRepo.updateSaleGroupData(' +
                groupData.groupId + ', ' + groupData.groupName + ', ' +
                groupData.groupDescription + ', ' + groupData.groupType + ', ' +
                groupData.groupRating + ', ' + groupData.groupMembers + ')');
    return saleGroups.findOne({where : {groupId : groupData.groupId}})
        .then(function(relGroup) {
          return relGroup.update({
            groupId : groupData.groupId,
            groupName : groupData.groupName,
            groupDescription : groupData.groupDescription,
            groupType : groupData.groupType,
            groupRating : groupData.groupRating,
            groupMembers : groupData.groupMembers
          });
        });
  }

  function deleteSaleGroup(groupId) {
    console.log('repos.connectionRepo.deleteSaleGroup(' + groupId + ')');
    saleGroup.destroy({where : {id : groupId}});
  }
  // End SaleGroup Repo Table Methods

  // SaleGroup Repo Query Methods
  function findAllGroupIds(ownerId) {}

  function findGroupsById(groupId) {
    return saleGroups.findAll({where : {groupId : groupId}})
        .then(function(groupIds) {
          console.log('repos.connectionRepo.findGroupsById(' + groupId +
                      ') groupIds: ' + groupIds);
          return groupIds;
        });
  }
  // End SaleGroup Repo Query Methods

  // saleGroupMembers Repo Table Methods
  function addGroupMember(groupId, userID) {}

  function removeGroupMember(groupId, userId) {}
  // End saleGroupMembers Repo Table Methods

  // saleGroupMembers Repo Query Methods
  function findGroupMembers(groupId) {}
  // End saleGroupMembers Repo Query Methods
  return {
    // Connection Repo
    createConnection : createConnection,
    deleteConnection : deleteConnection,
    findConnectionsById : findConnectionsById,
    // SaleGroup Repo
    createSaleGroup : createSaleGroup,
    updateSaleGroupData : updateSaleGroupData,
    deleteSaleGroup : deleteSaleGroup,
    findAllGroupIds : findAllGroupIds,
    findGroupsById : findGroupsById,
    // SaleGroup Catergory Repo

    // SaleGroup Ratings Repo

    // SaleGroupMembers Repo
    addGroupMember : addGroupMember,
    removeGroupMember : removeGroupMember,
    findGroupMembers : findGroupMembers
  };
}
// END CONNECTION REPOSITORY
module.exports = connectionRepository;
