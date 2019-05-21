/* jshint  esversion: 8 */ 
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:50
  }
});

const Genre = new mongoose.Model('Genre', genreSchema);

function validateGenre(body){
  const schema = {
    name: Joi.string().alphanum().required()
  };
  return Joi.validate(body, schema);
}

router.get('/', async (req,res) => {
  const genres = await Genre.find().sort('name').lean();
  res.send(genres);
});


router.post('/', async (req,res)=> {
  //we use variable first to define and save objet, then we store
  //the id returned by .save()
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id',(req,res)=>{

  Genre.
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
