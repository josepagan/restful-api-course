/* jshint  esversion: 6 */ 

const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//VIDLY 
//
//create a service for managing the list of genres
//each movie has a genre
//we need an endpoint to get the list of all genres
//we should to be able to create/edit/delete existing genres
//
//
