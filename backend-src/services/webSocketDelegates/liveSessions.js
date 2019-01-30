// liveSession containers
var liveSessions = {};

function liveSessionDelegate() {
  // Live Session Managers
  function initNewLiveSession(host) {
    liveSessions[host.userId] = [ host ];

    var constructNewSession = new Promise(function(err) {

    });

    console.log('liveSessionDelegate.initNewLiveSession liveSessions: ' +
                liveSessions);
  }

  function terminateLiveSession(host) {}
  // End Live Session Manager

  // Client Managers
  function appendClient(client) {}

  function removeClient(client) {}
  // End Client Managers

  // Live Session Activity Handlers
  function pushDataToChat(data) {
    liveSessions[req.sessionId].forEach(function(
        client) { client.socket.send(data); });
  }
  // End Live Session Activity Managers
  return {
    initNewLiveSession : initNewLiveSession,
    terminateLiveSession : terminateLiveSession,
    appendClient : appendClient,
    removeClient : removeClient,
    pushDataToChat : pushDataToChat
  };
}
module.exports = liveSessionDelegate;
