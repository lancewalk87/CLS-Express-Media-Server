var listeners = {};

function applicationClientDelegate() {
  function appendClient(client) {
    var userId = JSON.parse(client.user).info.id;
    listeners[userId] = client;

    console.log('Added Listener: ' + listeners[userId]);
  }

  function removeClient(client) {
    var userId = JSON.parse(client.user).info.id;
    listeners[userId] = null;

    console.log('Removed Listner: ' + listeners[userId]);
  }

  function sendNotification(client, msg) {
    var connections = JSON.parse(client.user).connections;

    for (var i in connections) {
      var cncID = connections[i];

      if (listeners[cncID]) {
        listeners[cncID].socket.send(msg);

        console.log('Sending to listner: ' + listeners[cncID].user);
      }
    }

    console.log('sendNotification(' + client + ', ' + msg + ')');
  }

  return {
    appendClient : appendClient,
    removeClient : removeClient,

    sendNotification : sendNotification
  };
}
module.exports = applicationClientDelegate;
