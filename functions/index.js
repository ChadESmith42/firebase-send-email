const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');


exports.contact_us = functions.https.onRequest(async (request, response) => {

    if (request.method === 'OPTIONS') {
        response.set('Access-Control-Allow-Methods', 'GET');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.set('Access-Control-Max-Age', '3600');
        response.set('Access-Control-Allow-Origin', 'https://codingbychad.com');
        response.status(204).send('');
    } else {
        sendgrid.setApiKey(functions.config().sendgrid.apikey);

        const email = {
            to: "chad@codingbychad.com",
            from: "chad.e.smith@outlook.com",
            subject: "CodingByChad Contact Form",
            text: `from: ${request.body.sender}, subject: ${request.body.subject} message: ${request.body.message}`,
            html: `<h2>${request.body.sender}</h2>
                <div><h4>${request.body.subject}</h4></div>
                <div><p>${request.body.message}</p></div>`
        };

        try {
            await sendgrid.send(email);
            console.log('Message was sent!');
            response.status(200).send(true);
        } catch (error) {
            console.log('Message failed!', request, email);
            response.status(400).send(error);
        }
        response.end();
    }
});
