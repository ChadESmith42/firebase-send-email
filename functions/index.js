const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const email = functions.config().gmail.email;
const password = functions.config().gmail.password;

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



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
