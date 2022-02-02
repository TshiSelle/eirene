//modules
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//file modules 
//const userRoutes = require('./routes/user_routes'); ****Example (uncomment later)****

//configuring the enviroment variable for the mongo URI string
dotenv.config();

//creating the express app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   //can now access url encoded form request bodies with req.body

//port to be used for requests
const PORT = process.env.PORT;

//connection string to mongoDB via URI
const mongoURI = process.env.MONGO_CONNECTION_URL;

//async function to connect to the db with mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
  .catch((err) => console.log(err));



