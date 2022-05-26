//node modules
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const morgan = require('morgan');

//file modules
const accountRoutes = require('./routes/accountRoutes');
const supportRoutes = require('./routes/supportRoutes');
const therapistRoutes = require('./routes/therapistRoutes');
const profileRoutes = require('./routes/profileRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const journal = require('./routes/journalRoutes');
const { register } = require('./controllers/accountController');
const verifyJWT = require('./middleware/TokenVerification');
const { verifyLoggedInUser } = require('./helperFunctions/verifyToken');
const { getUser } = require('./controllers/userController');

//configuring the environment variable for the mongo URI string
dotenv.config();

//creating the express app
const app = express();

//middleware
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //can now access url encoded form request bodies with req.body
app.use(helmet()); //secure app by setting http headers
app.use(hpp()); //prevent http parameter pollution
app.use(cors({
	origin: process.env.NODE_ENV == 'development' ? `http://localhost:${process.env.CLIENT_PORT}/` : 'https://eirene1.herokuapp.com/',
})); //enable cross-origin resource sharing

//port to be used for requests
const PORT = process.env.PORT;

//connection string to mongoDB via URI
const mongoURI = process.env.MONGO_CONNECTION_URL;

//async function to connect to the db with mongoose
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
	.catch((err) => console.log(err));

// Routing
app.use('/account', accountRoutes);
app.use('/journal', verifyJWT, journal);
app.use('/contact', supportRoutes);
app.use('/profile', verifyJWT, profileRoutes);
app.use('/', therapistRoutes);
app.use('/calendar', calendarRoutes);
app.post('/register', register);
app.get('/verifyToken', verifyLoggedInUser);
app.get('/user-info', verifyJWT, getUser);

//dummy routes
//trying jwt authentication
app.get('/getUsername', verifyJWT, (req, res) => {
	return res.json({ isLoggedIn: true, username: req.user.username });
});

// Unexpected URLs
app.use('*', (req, res) => {
	res.status(404).send(`Resource not found, "${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}"
  is not a valid url`);
});

//Get all routes
//uncomment to show

// getAllRoutes();

function getAllRoutes() {
	let str = '';
	app._router.stack.forEach(print.bind(null, []));
	console.log(str.replace(/^(.*)(\n\1)+$/gm, '$1'));

	function print(path, layer) {
		if (layer.route) {
			layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
		} else if (layer.name === 'router' && layer.handle.stack) {
			layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
		} else if (layer.method) {
			str += `${layer.method.toUpperCase()} /${path.concat(split(layer.regexp)).filter(Boolean).join('/')}`;
			str += '\n';
		}
	}

	function split(thing) {
		if (typeof thing === 'string') {
			return thing.split('/');
		} else if (thing.fast_slash) {
			return '';
		} else {
			var match = thing
				.toString()
				.replace('\\/?', '')
				.replace('(?=\\/|$)', '$')
				.match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
			return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>';
		}
	}
}
