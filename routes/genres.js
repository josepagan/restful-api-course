/* jshint  esversion: 8 */ 
const { Genre, validateGenre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
  const genres = await Genre.find().sort('name').lean();
  res.send(genres);
});

router.get('/:id', async (req,res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('THe genre with the given ID does not exist');
  res.send(genre);
});

router.post('/', async (req,res)=> {
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  //we use variable first to define and save objet, then we store
  //the id returned by .save()
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id',async (req,res)=>{
  const {error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
 

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{new: true});
  if (!genre) return res.status(404).send('The genre with the given id does not exist');


  res.send(genre);
}
);

router.delete('/:id',async (req,res)=>{
  const genre = await  Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID does not exist');
  console.log(genre);

  res.send(`Genre ${genre.name} deleted!`);

});

module.exports = router;
