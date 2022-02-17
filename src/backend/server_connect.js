//node modules
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


//file modules
const accountRoutes = require('./routes/accountRoutes');
const verifyJWT = require('./middleware/TokenVerification');
const accounts = require('./controllers/accountController');
const journal = require('./routes/journalPost');
const { Therapist } = require('./models/therapist');
const { contactUs } = require('./controllers/support');


//configuring the environment variable for the mongo URI string
dotenv.config();

//creating the express app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   //can now access url encoded form request bodies with req.body

//port to be used for requests
const PORT = process.env.PORT;

//connection string to mongoDB via URI
const mongoURI = process.env.MONGO_CONNECTION_URL;

//async function to connect to the db with mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
  .catch((err) => console.log(err));


// Routing
app.use('/account', accountRoutes);
app.post('/register', accounts.register);
app.use('/journal', journal)
app.post('/contact', verifyJWT, contactUs)














//dummy routes
//trying jwt authentication
app.get('/getUsername', verifyJWT, (req, res) => {
  return res.json({ isLoggedIn: true, username: req.user.username });
});

//fill db with therapists profiles
app.post('/createTherapist', (req, res) => {
  const newTherapist = new Therapist({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
    degree: req.body.degree,
    university: req.body.university,
    officeAddress: req.body.officeAddress,
    phone: req.body.phone,
    description: req.body.description,
    username: req.body.username,
    email: req.body.email,
  });
  newTherapist.save()
  .then(() => {
    res.status(201).json({ message: 'Created therapist profile successfully' })
  })
  .catch((err) => {
    res.status(400).json({ message: `Error occurred during therapist account creation`, error: `${err}` })
  });
})



// Unexpected URLs
app.use('*', (req, res) => {
  res.status(404).send('Resource not found');
});


// app.get('/add-journal', (req, res) => {
//   const journal = new Journal({
//     title: 'sad',
//     body: 'bade ente7ir' lol wtf
//   })
//   journal.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

