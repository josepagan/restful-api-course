/* jshint  esversion: 8 */ 

const Joi = require('joi');
const  mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isGold:{
    type: Boolean,
    required: true
  },
  phone:{
    type: Number,
    required: true
  }   
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(body){
  const schema = {
    name: Joi.string().alphanum().required().min(3).max(50),
    isGold: Joi.boolean().required(),
    phone: Joi.number().required()
  };
  return Joi.validate(body,schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
