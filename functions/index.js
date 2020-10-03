const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const email = functions.config().contactus.email;
const password = functions.config().contactus.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    },
});

exports.contactUs = functions.https.onRequest(async (request, response) => {
    const mailOptions = {
        from: request.body.from,
        to: 'chad@codingbychad.com',
        subject: '#CodingByChad Contact Form',
        text: request.body.text
    }

    try {
        await mailTransport.sendMail(mailOptions);
        console.log('Message was sent!');
        response.send(true);
    } catch (error) {
        console.log('Message failed!', request, mailOptions);
        response.send(error);
    }
    response.end();
})
