/* jshint  esversion: 8 */ 
const express = require('express');
const {Customer, validate} = require('../models/customer');
const router = express.Router();


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
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  let customer = new Customer({name, isGold, phone});//name, equals name:name...
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const {name, isGold, phone} = req.body;
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {name,isGold,phone},
    {new:true});
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) res.status(404).send('The customer with the given ID does not exist');
  res.send(`Customer ${customer.name} deleted!`);
});


module.exports = router;
