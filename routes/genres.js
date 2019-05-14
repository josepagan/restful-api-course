/* jshint  esversion: 6 */ 
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const uuidv1 = require('uuid/v1');

const genres = [];

function validateGenre(body){
  const schema = {
    name: Joi.string().alphanum().required()
  };
  return Joi.validate(body, schema);
}

router.get('/', (req,res) => {
  res.send(genres);
});

router.post('/', (req,res)=> {
  const genre = genres.find(genreObj=>genreObj.name === req.body.name);
  const {error} = validateGenre(req.body);
  if (genre) return res.send('The genre already exists');
  else if (error) return res.status(400).send(error.details[0].message); 
  else genres.push({id: uuidv1(),
  name: req.body.name});
  res.send('done');
});

router.put('/:id',(req,res)=>{
  const genreObj = genres.find(g => g.id === req.params.id);
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  else {
    genreObj.name = req.body.name;
    res.send(genreObj.name);
  }
});

router.delete('/:id',(req,res)=>{
  const i = genres.findIndex(g => g.id === req.params.id);
  const genreName = genres[i].name;
  genres.splice(i,1);
  res.send(`Genre ${genreName} deleted!`);
  
});

module.exports = router;
