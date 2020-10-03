const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');
const parser = require('body-parser');

exports.contact_us = functions.https.onRequest(async (request, response) => {

    sendgrid.setApiKey(functions.config().sendgrid.apikey);

    const email = {
        to: "chad@codingbychad.com",
        from: "chad.e.smith@outlook.com",
        subject: "CodingByChad Contact Form",
        text: `${request.body.sender} sent: ${request.body.message}`,
        html: `<h2>${request.body.sender}</h2><div><p>${request.body.message}</p></div>`
    };

    try {
        await sendgrid.send(email);
        console.log('Message was sent!');
        response.send(true);
    } catch (error) {
        console.log('Message failed!', request, email);
        response.send(error);
    }
    response.end();
})
