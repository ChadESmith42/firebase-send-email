const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');



exports.contactUs = functions.https.onRequest(async (request, response) => {

    sendgrid.setApiKey(functions.config().sendgrid.apikey);

    const email = {
        to: "chad@codingbychad.com",
        from: request.body.from,
        subject: "CodingByChad Contact Form",
        text: request.body.text,
        html: `<p>${request.body.text}</p>`
    };

    try {
        await sendgrid.send(email);
        console.log('Message was sent!');
        response.send(true);
    } catch (error) {
        console.log('Message failed!', request, mailOptions);
        response.send(error);
    }
    response.end();
})
