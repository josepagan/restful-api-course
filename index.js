/* jshint  esversion: 6 */ 

const Joi = require('joi');
const express = require('express');
const app = express();
const uuidv1 = require('uuid/v1');
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres)
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
