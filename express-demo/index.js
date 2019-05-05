/* jshint  esversion: 6 */ 
//joi validation library returns class so better to capitalize
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'}
];

app.get('/',(req,res)=>{
  res.send('Hello World');
});

app.get('/api/courses', (req,res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  //functional, find whatever elementent whose .id is equal to req.params.id
const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found');
  res.send(course);
});
app.post('/api/courses', (req, res) => {
  //schema to define joi validation requirement
  const schema = {
    name: Joi.string().min(3).required()
  };
  //validate requres req.body and schema and returns object to be stored
  const result =  Joi.validate(req.body, schema);
  console.log(result);
  //never trust the customer! we need some validation:
  if (!req.body.name || req.body.name.length < 3) {
    //400 Bad Request:
    res.status(400).send('Name is required and should be 3 characters');
    return; //we dont want the rest of function to be executed
  }
  //we need to create a new course object to inject it in the post reques
  const course = {
    id: courses.length + 1,
    name: req.body.name 
    // for req.body.name to work we need to enable parsing of json objets in body of req
    // app.use(express.json())
  };
  courses.push(course);
  //by convention it is always good to send what has chaged, the new course added.f
  //
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
