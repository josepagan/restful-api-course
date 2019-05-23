/* jshint  esversion: 8 */ 

import mongoose from 'mongoose';

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
