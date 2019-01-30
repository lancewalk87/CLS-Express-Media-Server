function connectionsUseCase(connectionRepo, userRepo) {
  // Connection Methods
  function createGroup(data) {}

  function modifyGroup(groupId, modificationData) {
    return connectionsRepo.modifySaleGroup(groupId, modificationData)
        .then(function(groupData) { return groupData; });
  }

  function deleteConnection(id, connectionId) {
    connectionRepo.deleteConnection(id, connectionId);
  }

  function deleteGroup(data) {}
  // End Connection Methods
  return {
    createGroup : createGroup,
    modifyGroup : modifyGroup,
    deleteConnection : deleteConnection,
    deleteGroup : deleteGroup
  };
}
module.exports = connectionsUseCase;
