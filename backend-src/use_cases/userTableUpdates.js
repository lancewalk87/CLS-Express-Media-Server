function userTableUpdatesUseCase(userRepo, repo) {
  function getConnectionIds(clientId, postInt) {
    updateUser(clientId, 'connections', postInt + 1);
    return repo.findConnectionsById(clientId).then(function(connections) {
      console.log('userTableUpdatesUseCase.getConnectionIds(' + clientId +
                  ') connections: ' + connections + '');
      // return extractTableIds(connections, 'connectionId');
    });
  }

  function extractTableIds(tables, tableId) {
    var Json = {"ids" : {}};
    for (var i in tables) {
      var table = tables[i];
      var id = {"id" : table.tableId};
      var entry = JSON.stringify(id);
      var entryId = 'connection' + i;
      Json.ids[entryId] = entry;
    }
    return Json.ids;
  }

  function updateUser(userId, userItem, data) {
    userRepo.updateUserData(userId, userItem, data);
  }
  return { getConnectionIds: getConnectionIds }
}
module.exports = userTableUpdatesUseCase;
