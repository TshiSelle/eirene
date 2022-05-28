const nodemailer = require('nodemailer');

//*************** Email transfer functions ******************
const CLIENT_URL = process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.CLIENT_PORT}` : 'https://eirene1.herokuapp.com';


var Transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'loom.senior@gmail.com',
		pass: process.env.LOOM_EMAIL_PASSWORD,
	},
});
function sendEmailVerification(username, email, emailVerificationToken) {
	let sender = 'Eirene <loom.senior@gmail.com>';
	var mailOptions = {
		from: sender,
		to: email,
		subject: 'Eirene account verification',
		html: `
   
    <h3>Hello ${username},</h3>

    <p>
      We're happy you signed up for Eirene.<br />
      To start exploring your perks, <br />
      please confirm your email address.
    </p>
		<a href=http://localhost:${process.env.CLIENT_PORT}/verify/${username}/${emailVerificationToken}>
    <button 
      type="button"
      onmouseover="this.style.background='#F3A38F'"
      onmouseleave="this.style.background='#eebec3'"
    > Verify Now</button></a>

    <p>
      If you encounter any problem with the verification button,<br />
      please paste the below link in your URL.
    </p>
    <a href=http://localhost:${process.env.CLIENT_PORT}/verify/${username}/${emailVerificationToken}>http://localhost:${process.env.CLIENT_PORT}/verify/${username}/${emailVerificationToken}</a> <br />
    <p style="margin-top: 20px">Welcome to Eirene !</p>
    <p>The Eirene Team</p>
  `,
		//	html: `Hello! press <a href=http://localhost:${process.env.CLIENT_PORT}/verify/${username}/${emailVerificationToken}>here</a> to verify your account!`,
	};

	Transport.sendMail(mailOptions, (error, res) => {
		if (error) {
			res.status(400).json({ error: error.name + ': ' + error.message });
			console.log(error);
		} else {
			console.log('Email sent');
		}
	});
}

function sendEmailResetPass(email, username, passResetToken) {
	let sender = 'Eirene <loom.senior@gmail.com>';
	var mailOptions = {
		from: sender,
		to: email,
		subject: 'Eirene account reset password',
		html: `Hello! press <a href=${CLIENT_URL}/forgot-password/${username}/${passResetToken}>here</a> to reset your password.`,
	};

	Transport.sendMail(mailOptions, (error, response) => {
		if (error) {
			res.status(400).json({ error: error.name + ': ' + error.message });
			console.log(error);
		} else {
			console.log('Email sent');
		}
	});
}

function sendEmailSupport(dbSender, message) {
	let sender = dbSender.username ? `${dbSender.username} <${dbSender.email}>` : `<${dbSender.email}>`;
	var mailOptions = {
		from: sender,
		to: 'eireneContactUs@gmail.com',
		subject: `Support message from ${dbSender.fname} ${dbSender.lname}`,
		text: message,
	};

	Transport.sendMail(mailOptions, (error, response) => {
		if (error) {
			res.status(400).json({ error: error.name + ': ' + error.message });
			console.log(error);
		} else {
			console.log('Email sent');
		}
	});
}

function sendDeactivationEmail(dbUser) {
	const { email, deactivationDate, username } = dbUser;
	let sender = 'Eirene <loom.senior@gmail.com>';
	var mailOptions = {
		from: sender,
		to: email,
		subject: `Eirene account deactivation for ${username}`,
		html: `Hello! <br />Your account will be deactivated at ${deactivationDate.toLocaleString()} <br />You can stop the deactivation process from inside your account settings.`,
	};

	Transport.sendMail(mailOptions, (error, response) => {
		if (error) {
			res.status(400).json({ error: error.name + ': ' + error.message });
			console.log(error);
		} else {
			console.log('Email sent');
		}
	});
}

module.exports = {
	sendEmailVerification,
	sendEmailResetPass,
	sendEmailSupport,
	sendDeactivationEmail,
};
