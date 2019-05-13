/* jshint  esversion: 6 */ 

const Joi = require('joi');
const express = require('express');
const app = express();
const uuidv1 = require('uuid/v1');

app.use(express.json());

//VIDLY 
//
//create a service for managing the list of genres
//each movie has a genre
//we need an endpoint to get the list of all genres
//we should to be able to create/edit/delete existing genres
//
//
//
  
function validateGenre(body){
  const schema = {
    name: Joi.string().alphanum().required()
  };
  return Joi.validate(body, schema);
}

const genres = [];

app.get('/', (req,res) => {
  res.send('welcome to VIDLY!');
});

app.get('/api/genres', (req,res) => {
  res.send(genres);
});


app.post('/api/genres', (req,res)=> {
  console.log(req.body.name);
  const genre = genres.find(genreObj=>genreObj.name === req.body.name);
  
  const {error} = validateGenre(req.body);
  if (genre) return res.send('The genre already exists');
  else if (error) return res.status(400).send(error.details[0].message); 
  else genres.push({id: uuidv1(),
  name: req.body.name});
  res.send('done');
});

app.put('/api/genres/:id',(req,res)=>{
  const genreObj = genres.find(g => g.id === req.params.id);

  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  else {
    genreObj.name = req.body.name;
    res.send(genreObj.name);
  }
  
});

app.delete('/api/genres/:id',(req,res)=>{
  const i = genres.findIndex(g => g.id === req.params.id);
  const genreName = genres[i].name;
  genres.splice(i,1);
  res.send(`Genre ${genreName} deleted!`);
  
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
