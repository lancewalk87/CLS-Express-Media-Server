// WebSocket Delegates
var applicationClientDelegate =
    require('./webSocketDelegates/applicationClient');
var liveSessionDelegate = require('./webSocketDelegates/liveSessions');

// appBackendService
function appBackendService() {
  // delegate types
  var applicationClient = applicationClientDelegate();
  var liveSession = liveSessionDelegate();

  function main(ws, req) {
    var client = {socket : ws, clientType : req.clientType, user : req.user};
    determineSocketDelegate(client);

    // Socket Events
    ws.on('message', function(data) {
      console.log('ws.on(\'message\', function(' + data + ')');
      if (client.clientType == 'feedService') {
        applicationClient.sendNotification(client, data);
      }
    });

    ws.on('close', function() {
      if (client.clientType == 'feedService') {
        applicationClient.removeClient(client);
      }
    });
    // End Socket Events

    function determineSocketDelegate(client) {
      switch (client.clientType) {
      case 'feedService':
        applicationClient.appendClient(client);
        break;
      case 'chatService':
        liveSession.appendClient(client);
        break;
      default:
        break;
      }
    }
  }
  return {main : main};
}
// End appBackendService
module.exports = appBackendService;
