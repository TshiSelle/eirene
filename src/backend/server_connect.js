const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const Journal = require('./models/journal');

//configuring the enviroment variable for the mongo URI string
dotenv.config();

//creating the express app
const app = express();

//port to be used for requests
const PORT = process.env.PORT;

//connection string to mongoDB via URI
const mongoURI = process.env.MONGO_CONNECTION_URL;

//async function to connect to the db with mongoose
mongoose.connect(mongoURI, { userNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));


app.get('/add-journal', (req, res) => {
  const journal = new Journal({
    title: 'sad',
    body: 'bade ente7ir'
  })

  journal.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });



})