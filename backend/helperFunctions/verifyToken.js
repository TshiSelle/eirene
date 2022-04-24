const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//passing in the verifyJWT middleware as the second parameter to app.get() lets us access the current user's data
const verifyLoggedInUser = (req, res) => {
	const token = req.headers['x-access-token'] ? req.headers['x-access-token'].split(' ')[1] : null;
	//extract token from header (without the 'Bearer' tag)

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				// error during jwt verification
				return res.status(401).json({
					isLoggedIn: false,
					message: 'Authentication failed',
					success: false,
				});
			} else {
				req.user = {};
				req.user.id = decoded.id;
				req.user.username = decoded.username;
				// if verification succeeds we can advance to the route and send back isLoggedIn set to true
				res.status(200).json({
					message: 'Successful Authentication',
					isLoggedIn: true,
					success: true,
					userInfo: req.user,
				});
			}
		});
	} else {
		res.status(401).json({ message: 'Incorrect Token', isLoggedIn: false, success: false });
	}
};

module.exports = { verifyLoggedInUser };
