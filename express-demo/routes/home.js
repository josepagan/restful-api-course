/* jshint  esversion: 6 */ 
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('index',{title:'My Express router', message:'Hello'});
});

module.exports = router;
