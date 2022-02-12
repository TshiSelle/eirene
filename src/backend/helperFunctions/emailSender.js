const nodemailer = require('nodemailer');


//*************** Email transfer function ******************

function sendEmail(email, uniqueString) {
    var Transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'loom.senior@gmail.com',
            pass: process.env.LOOM_EMAIL_PASSWORD
        }
    });

    let sender = 'Eirene';
    var mailOptions = {
        from: sender,
        to: email,
        subject: 'Eirene account verification',
        html: `Hello!, press <a href=http://localhost:${process.env.PORT}/account/verify/${uniqueString}>here</a> to verify your account!`
    };

    Transport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent')
        }
    });


}


module.exports = sendEmail;