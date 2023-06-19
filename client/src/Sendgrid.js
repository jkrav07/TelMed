const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);


let sendEmail = {};
sendEmail.sendEmail = async function(messageObj) {
  try {
    await sendGridMail.send(messageObj);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error.message);
    if (error.response) {
      console.error(error.response.body)
    }
  }
};

module.exports = sendEmail;