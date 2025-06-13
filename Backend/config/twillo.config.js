// Load environment variables from .env.twillio file
require('dotenv').config({ path: '.env.twillio' });

module.exports = {
    twilloAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilloAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilloVerifiedServiceId: process.env.TWILIO_VERIFIED_SERVICE_ID
};