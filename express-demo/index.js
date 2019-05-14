/* jshint  esversion: 6 */ 
//debug require an arbitrary name-space for debuging
//this name will be changed in the developemnt stage with:
//export DEBUG=app:startup  or whatever the area we need
//if we want different name spaces at the same time we use , to separate
//or wildcard *
//
//instead of using export we can just set debug as we run app with 
//$DEBUG=app:db nodemon index.js
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const auth = require('./auth');
const express = require('express');
const app = express();
app.set('view engine', 'pug');

//access to the enviroment variable, both methods give different results
//app.get('env') defaults to dev if no enviroment set
//
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
//allows to read url encoded data on the body
app.use(express.urlencoded({extended: true}));
//allows use of static sites
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use(helmet());


//configuration
//uses the npm config and is setup at the config folder
//from there we can stablish different environment elements and link to variables like passwords

console.log(`Application Name: ${config.get('name')} `);
console.log(`Mail Server:  ${config.get('mail.host')} `);
// console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}
const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'}
];

app.get('/',(req,res)=>{
  res.render('index',{title:'My Express App', message:'Hello'});
});

app.get('/api/courses', (req,res) => {
  res.send(courses);
});

const findCourse = (req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The coursewith the given ID was not found');
  else return course;
};

app.get('/api/courses/:id', (req, res) => {
  //functional, find whatever elementent whose .id is equal to req.params.id
  // const course = courses.find(c => c.id === parseInt(req.params.id));
  // if (!course) res.status(404).send('The course with the given ID was not found');
  // res.send(course);
  const course = findCourse(req,res);
  res.send(course);
  // console.log(courseResult.index)

});
app.post('/api/courses', (req, res) => {
  
  const {error} = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  //old validation
  //never trust the customer! we need some validation:
  // if (result.error) {
    //400 Bad Request:
    // We dig some message out of the error object, so the customer can read 
    // what is goin on...
    // res.status(400).send(result.error.details[0].message);
    // return; //we dont want the rest of function to be executed
  // }
 

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
//put is used to update acording the RESTful api principles
app.put('/api/courses/:id', (req,res)=>{
  //Look up the course
  const course = findCourse(req,res);
  //if course does not exist
  if (!course)  return res.status(404).send('The course with the given ID was not found');
  

  const {error} = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message); 

    //modify course object
    course.name = req.body.name;
    //send to see new changes
    res.send(course);
  
  //If it does it has to change it and display the new version
});
function validateCourse(course){
  //schema to define joi validation requirement
  //validate requres req.body and schema and returns object to be stored
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);

}

app.delete('/api/courses/:id', (req,res)=>{
  //look up the course
  //
  const course = findCourse(req,res);

  //not existing return 404
  if (!course)  return res.status(404).send('The course with the given ID was not found');
  //
  //delete
  //to delete we have to find the index and then splice it off,
  //my first idea of just update to  course=null is not probably very efficient

  const index = courses.indexOf(course);
  courses.splice(index,1);
  res.send(course);


  //
  //return the same course

}
);
