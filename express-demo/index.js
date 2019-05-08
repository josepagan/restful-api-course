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

const findCourse = (req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found');
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
  
  const {error} = validateCourse(request.body);
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return; //we dont want the rest of function to be executed
  }
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
  if (!course) res.status(404).send('The course with the given ID was not found');
  

  const {error} = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return; //we dont want the rest of function to be executed
  }

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
