/* jshint  esversion: 8 */ 

const Joi = require('joi');
const  mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength:50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(body){
  const schema = {
    name: Joi.string().alphanum().required().min(3).max(50)
  };
  return Joi.validate(body, schema);
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;
