/*** InitialUseCases: EmailVerification ***/
const nodemailer = require('nodemailer'),
      smtp = require('nodemailer-smtp-transport'),
      writeJsonFile = require('write-json-file'),
      loadJsonFile = require('load-json-file'), fs = require('fs'),
      path = require('path'), wait = require('wait-for-stuff'),
      Cryptr = require('cryptr'), cryptr = new Cryptr('myTotalySecretKey');

function emailVerificationUseCase(auth) {
  // SMTP Config \\
  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
      type : auth.googleAuth.type,
      user : auth.googleAuth.user,
      clientId : auth.googleAuth.clientID,
      clientSecret : auth.googleAuth.clientSecret,
      refreshToken : auth.googleAuth.refreshToken,
      accessToken : auth.googleAuth.accessToken
    },
    logger : true,
    debug : false
  });

  // SMTP Methods \\
  function initSMTPTransport(userData) {
    var user = {
      // User Info
      "fullName" : userData[0],
      "birthDate" : userData[1],
      "address1" : userData[2],
      "postCode" : userData[3],
      "city" : userData[4],
      "state" : userData[5],
      "email" : userData[6],
      "password" : userData[7],
      "isSeller" : userData[8]
    };

    // SMTP - Transport
    var resp = null, id = writeUserTemp(user), id_encrypt = cryptr.encrypt(id);
    const verLink =
        'http://199.58.187.114:3000/register/complete?id=' + id + ' ';

    transporter.sendMail({
      from : 'Shopcaster <support@Shopcaster.com>',
      to : user.email,
      subject : 'Shopcaster- Account Verification',
      html :
          '<p>Welcome <b>' + user.fullName + '</b>!,</p>' +
              '<p>We\'re happy to have you onboard, please click the link below to verify your account.</p>' +
              '<a href="' + verLink + '">Verify Your Account</a><br/>' +
              '<p><b>Happy Casting!</b></p>'
    },
                         (err, info) => { resp = info; });
    wait.for.predicate(() => (resp));

    return Promise.resolve(id_encrypt);
  }

  // User Temp Methods \\
  function writeUserTemp(tempData) {
    // Write User Temp
    var id = '',
        charSet =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 12; i++) {
      id += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    const dir = path.join(__dirname, '../../public/userProfiles/userTemps/' +
                                         id + '.json');
    writeJsonFile(dir, JSON.stringify(tempData), function(err) {
      if (err)
        throw err;
    });

    return id;
  }

  function uploadUserImg(id) { id = cryptr.decrypt(id); }

  function readUserTemp(id) {
    const dir = path.join(__dirname, '../../public/userProfiles/userTemps/' +
                                         id + '.json');

    return loadJsonFile(dir)
        .then(userTemp => {
          fs.unlinkSync(dir);
          return JSON.parse(userTemp);
        })
        .catch(err => { throw err; });
  }

  // Export Methods \\
  return {
    initSMTPTransport : initSMTPTransport,
    uploadUserImg : uploadUserImg,
    readUserTemp : readUserTemp
  };
}
/*** End ***/
module.exports = emailVerificationUseCase;
