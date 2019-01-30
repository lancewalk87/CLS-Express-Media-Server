/*** Stripe Service: Dependancies ***/
const config = require('./config');
const stripe = require('stripe')(config.stripe.secertKey);
stripe.setApiVersion(config.stripe.apiVersion);

function stripeService() {

  // Stripe Methods \\


  // Epxort Methods \\
  return {

  };
}
/*** End ***/
module.exports = stripeService;
