const nodemailer = require("nodemailer");

//*************** Email transfer functions ******************
const CLIENT_URL = process.env.NODE_ENV == "development" ? `http://localhost:${process.env.CLIENT_PORT}` : "https://eirene1.herokuapp.com";

var Transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "loom.senior@gmail.com",
    pass: process.env.LOOM_EMAIL_PASSWORD,
  },
});
function sendEmailVerification(username, email, emailVerificationToken) {
  let sender = "Eirene <loom.senior@gmail.com>";
  var mailOptions = {
    from: sender,
    to: email,
    subject: "Eirene account verification",
    html: `
		<h3 style="font-size: 24px; margin: 15px 15px 15px 15px;">Hello ${username},</h3>
	 
	<p style="margin: 5px 15px 15px 15px; font-size: 16px;">
	  We're happy you signed up for Eirene.<br />
	  To start exploring your perks, <br />
	  please confirm your email address.
	</p>
		<a href=${CLIENT_URL}/verify/${username}/${emailVerificationToken}  style="margin: 15px 15px 15px 15px;">
	<button
	style="margin: 5px 15px 5px 15px;width: 200px;background-color: #eebec3;border: 0;border-radius: 0.5rem;box-sizing: border-box;color: #ffffff;font-family: 'Inter var', ui-sans-serif, system-ui, -apple-system,  system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',  sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',  'Noto Color Emoji';font-size: 0.875rem;font-weight: 600;line-height: 1.25rem;padding: 0.75rem 1rem;text-align: center;text-decoration: none #d1d5db solid;text-decoration-thickness: auto;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),  0 1px 2px 0 rgba(0, 0, 0, 0.06);cursor: pointer;user-select: none;-webkit-user-select: none;touch-action: manipulation;"
	  type="button"
	> Verify Now</button></a>
 
	<p style="margin: 5px 15px 15px 15px; font-size: 16px;">
	  If you encounter any problem with the verification button,<br />
	  please paste the below link in your URL.
	</p>
	<a href=${CLIENT_URL}/verify/${username}/${emailVerificationToken}>${CLIENT_URL}/verify/${username}/${emailVerificationToken}</a> <br />
  
    <p style="margin-top: 20px; font-size: 16px;">Welcome to Eirene !</p>
    <p style="margin: 5px 15px 15px 15px; font-size: 16px;">The Eirene Team</p>

  `,
  };
  //	html: `Hello! press <a href=http://localhost:${process.env.CLIENT_PORT}/verify/${username}/${emailVerificationToken}>here</a> to verify your account!`,

  Transport.sendMail(mailOptions, (error, res) => {
    if (error) {
      res.status(400).json({ error: error.name + ": " + error.message });
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
}

function sendEmailResetPass(email, username, passResetToken) {
  let sender = "Eirene <loom.senior@gmail.com>";
  var mailOptions = {
    from: sender,
    to: email,
    subject: "Eirene account reset password",
    html: `<h3 style="font-size: 24px; margin: 15px 15px 15px 15px;">Hello ${username},</h3>
	 
    <p style="margin: 5px 15px 15px 15px; font-size: 16px;">
      
Trouble signing in?<br />
Resetting your password is easy.<br />
Just press the button below and follow the instructions. We’ll have you up and running in no time.</p>

<a href=${CLIENT_URL}/verify/${username}/${emailVerificationToken}  style="margin: 15px 15px 15px 15px;"> 
<button
style="margin: 5px 15px 5px 15px;width: 200px;background-color: #eebec3;border: 0;border-radius: 0.5rem;box-sizing: border-box;color: #ffffff;font-family: 'Inter var', ui-sans-serif, system-ui, -apple-system,  system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',  sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',  'Noto Color Emoji';font-size: 0.875rem;font-weight: 600;line-height: 1.25rem;padding: 0.75rem 1rem;text-align: center;text-decoration: none #d1d5db solid;text-decoration-thickness: auto;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),  0 1px 2px 0 rgba(0, 0, 0, 0.06);cursor: pointer;user-select: none;-webkit-user-select: none;touch-action: manipulation;"
  type="button"
>Reset Password</button></a>
  
    <p style="margin: 5px 15px 15px 15px; font-size: 16px;">
    If you did not make this request then please ignore this email.
    </p>
    <a href=${CLIENT_URL}/verify/${username}/${passResetToken}>${CLIENT_URL}/forgot-password/${username}/${passResetToken}</a> <br />
    
      <p style="margin-top: 20px; font-size: 16px;">Welcome to Eirene !</p>
      <p style="margin: 5px 15px 15px 15px; font-size: 16px;">The Eirene Team</p>`
    // html: `Hello! press <a href=${CLIENT_URL}/forgot-password/${username}/${passResetToken}>here</a> to reset your password.`,
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ error: error.name + ": " + error.message });
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
}

function sendEmailSupport(dbSender, message) {
  let sender = dbSender.username ? `${dbSender.username} <${dbSender.email}>` : `<${dbSender.email}>`;
  var mailOptions = {
    from: sender,
    to: "eireneContactUs@gmail.com",
    subject: `Support message from ${dbSender.fname} ${dbSender.lname}`,
    text: message,
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ error: error.name + ": " + error.message });
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
}

function sendDeactivationEmail(dbUser) {
  const { email, deactivationDate, username } = dbUser;
  let sender = "Eirene <loom.senior@gmail.com>";
  var mailOptions = {
    from: sender,
    to: email,
    subject: `Eirene account deactivation for ${username}`,
    html: `Hello! <br />Your account will be deactivated at ${deactivationDate.toLocaleString()} <br />You can stop the deactivation process from inside your account settings.`,
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ error: error.name + ": " + error.message });
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
}

module.exports = {
  sendEmailVerification,
  sendEmailResetPass,
  sendEmailSupport,
  sendDeactivationEmail,
};
