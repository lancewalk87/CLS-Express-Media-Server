/*** Remote Authentication: Passport ***/
const FacebookStrategy = require('passport-facebook').Strategy,
      GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function remoteAuthConfig(userRepo, jwtKey, authKeys, passport) {
  const registerUserUseCase =
      require('../../../use_cases/initialUseCases/register_user'),
        useCase = registerUserUseCase(userRepo, jwtKey);

  /*** Passport Serializers ***/
  passport.serializeUser(function(user, done) { done(null, user.id); });

  passport.deserializeUser(function(id, done) {
    userRepo.findUserByEmail(id, function(err, user) { done(err, user); });
  });

  /*** Strategies ***/
  passport.use(new FacebookStrategy(
      {
        // Facebook
        clientID : authKeys.facebookAuth.clientID,
        clientSecret : authKeys.facebookAuth.clientSecret,
        callbackURL : authKeys.facebookAuth.callbackURL
      },
      function(token, refreshToken, profile,
               done) { userConfig(token, refreshToken, profile, done) }));

  passport.use(new GoogleStrategy(
      {
        // Google
        clientID : authKeys.googleAuth.clientID,
        clientSecret : authKeys.googleAuth.clientSecret,
        callbackURL : authKeys.googleAuth.callbackURL
      },
      function(token, refreshToken, profile,
               done) { userConfig(token, refreshToken, profile, done) }));

  /*** Users ***/
  function userConfig(token, refreshToken, profile, done) { // User Data
    process.nextTick(function() {
      userRepo.findOne({'facebook.id' : profile.id}, function(err, user) {
        if (err)
          return done(err);
        if (user) { // user: existing
          return done(null, user);
        } else { // user: new
          const data = function() {
            var name = profile.displayName;
            if (profile.name)
              name = profile.name.givenName + ' ' + profile.name.familyName;

            return {
              // repo definitions
              "socialId" : profile.id,
              "socialToken" : token,
              "fullName" : name,
              "email" : profile.emails[0].value,
              "password" : profile.password
            };

            // user:
            newUser(data);
          }
        }
      });
    });
  }

  function newUser(userData) { // Create User
    console.log('userData: ' + userData);
    useCase.register().then(function(resp) {

    });
  }
}
module.exports = remoteAuthConfig;
