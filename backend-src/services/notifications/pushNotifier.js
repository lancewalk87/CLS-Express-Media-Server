// Dependancies:
var apn = require('apn');
var gcm = require('node-gcm');

function pushNotifier(client) {
  // Variables
  var clientToken =

      var options = {
        token : {
          key : "key.pem",
          keyId : "com.shopcaster.ios",
          teamId : "E7KW589BQR",
        },
        production : false
      };

  var apnProvider = new apn.Provider();
  let deviceTokens = [ "devicetokens" ];

  let notification = new apn.Notification();
  notification.alert = "## alert ##";
  notification.badge = 1;
  notification.topic = "com.shopcaster.ios";

  apnProvider.send(notification, deviceTokens)
      .then((response) => { console.log(JSON.stringify(response)); });

  function transmit() {
    // plateform
    // transmit final notificatr
    sender
  }

  return {transmit : transmit};
}
module.exports = pushNotifier;
