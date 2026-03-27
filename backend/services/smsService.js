const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

const sendSMS = async (to, message) => {
  if (!client || !process.env.TWILIO_PHONE || !to) return;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to
    });
    console.log("SMS sent");
  } catch (error) {
    console.log("SMS error:", error.message);
  }
};

module.exports = sendSMS;