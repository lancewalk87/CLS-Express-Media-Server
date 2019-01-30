require('dotenv').config();

module.exports = {
  country : 'US',
  currency : 'eur',

  stripe : {
    country : process.env.STRIPE_ACCOUNT_COUNTRY || 'US',
    apiVersion : '2018-02-06',
    publishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey : process.env.STRIPE_SECRET_KEY,
    webhookSecret : process.env.STRIPE_WEBHOOK_SECRET,
  },

  ngrok : {
    enabled : true,
    port : process.env.PORT || 8000,
    subdomain : process.env.NGROK_SUBDOMAIN,
    authtoken : process.env.NGROK_AUTHTOKEN,
  }
};
