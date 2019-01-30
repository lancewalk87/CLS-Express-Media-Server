// authentication/remote/auth.js
const keys = {
  'facebookAuth' : {
    'clientID' : 'clientID',
    'clientSecret' : 'secret',
    'callbackURL' : 'callbackURL',
    'profileURL' :
        'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields' : [ 'id', 'email', 'name' ]
  },

  'twitterAuth' : {
    'consumerKey' : 'your-consumer-key-here',
    'consumerSecret' : 'your-client-secret-here',
    'callbackURL' : 'callbackURL'
  },

  'googleAuth' : {
    'type' : 'OAuth2',
    'user' : 'user_address',
    'clientID' : 'user-client-id',
    'clientSecret' : 'secret',
    'refreshToken' : 'token',
    'accessToken' : 'accessToken',
    'callbackURL' : 'callbackURL'
  }
};
module.exports = keys;
