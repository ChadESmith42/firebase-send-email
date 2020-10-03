const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const email = functions.config().contactus.email;
const password = functions.config().contactus.password;

const app = express();
app.use(bodyParser.json());


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
        response.send(true);
    } catch (error) {
        response.send(error);
    }
    response.end();
})
