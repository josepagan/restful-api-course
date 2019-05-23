/* jshint  esversion: 8 */ 
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

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
    phone: Joi.number().required().min(8).max(12)
  };
}

router.get('/',async (req,res) =>{
  const customers = await Customer.find();
  res.send(customers);
});

router.get('/:id', async (req,res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) res.status(404).send('The customer with the give id does not exist');
  res.send(customer);
});

router.post('/', async (req,res)=> {
const  {name, isGold, phone} = req.body;
  const {error} = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  //we use variable first to define and save objet, then we store
  //the id returned by .save()
  let customer = new Customer({name,isGold,phone});
  customer = await genre.save();
  res.send(customer);
});




module.exports = router;
