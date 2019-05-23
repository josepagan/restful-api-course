/* jshint  esversion: 6 */ 
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
  .then(()=>{console.log('Connected to mongodb');})
  .catch(err => {console.error('Could not connect to mongodb');});
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

//VIDLY 
//
//create a service for managing the list of genres
//each movie has a genre
//we need an endpoint to get the list of all genres
//we should to be able to create/edit/delete existing genres
//
//
//
  

app.get('/', (req,res) => {
  res.send('welcome to VIDLY!');
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
