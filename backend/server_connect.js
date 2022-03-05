//node modules
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet')
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const morgan = require('morgan');

//file modules
const accountRoutes = require('./routes/accountRoutes');
const supportRoutes = require('./routes/supportRoutes');
const therapistRoutes = require('./routes/therapistRoutes');
const journal = require('./routes/journalPost');
const accounts = require('./controllers/accountController');
const verifyJWT = require('./middleware/TokenVerification');

//configuring the environment variable for the mongo URI string
dotenv.config();

//creating the express app
const app = express();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   //can now access url encoded form request bodies with req.body
app.use(helmet());                                    //secure app by setting http headers
app.use(hpp());                                       //prevent http parameter pollution
app.use(cors());                                      //enable cross-origin resource sharing

//port to be used for requests
const PORT = process.env.PORT;

//connection string to mongoDB via URI
const mongoURI = process.env.MONGO_CONNECTION_URL;

//async function to connect to the db with mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
  .catch((err) => console.log(err));


// Routing
app.use('/account', accountRoutes);
app.use('/journal', journal);
app.use('/contact', supportRoutes);
app.use('/', therapistRoutes);
app.post('/register', accounts.register);


//dummy routes
//trying jwt authentication
app.get('/getUsername', verifyJWT, (req, res) => {
  return res.json({ isLoggedIn: true, username: req.user.username });
});


// Unexpected URLs
app.use('*', (req, res) => {
  res.status(404).send(`Resource not found, "${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}" is not a valid url`);
});





//Get all routes
//uncomment to show

//getRoutes();


function getRoutes() {
  let str= "";
  app._router.stack.forEach(print.bind(null, []))
  console.log(str.replace(/^(.*)(\n\1)+$/gm,"$1"));
  
  function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      str += `${layer.method.toUpperCase()} /${path.concat(split(layer.regexp)).filter(Boolean).join('/')}`
      str += '\n';
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }

}