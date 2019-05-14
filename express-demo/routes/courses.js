/* jshint  esversion: 6 */ 
const express = require('express');
const router = express.Router();

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'}
];


router.get('', (req,res) => {
  res.send(courses);
});

const findCourse = (req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The coursewith the given ID was not found');
  else return course;
};

router.get('/:id', (req, res) => {
  //functional, find whatever elementent whose .id is equal to req.params.id
  // const course = courses.find(c => c.id === parseInt(req.params.id));
  // if (!course) res.status(404).send('The course with the given ID was not found');
  // res.send(course);
  const course = findCourse(req,res);
  res.send(course);
  // console.log(courseResult.index)
});

router.post('', (req, res) => {
  const {error} = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name 
  };
  courses.push(course);
  //by convention it is always good to send what has chaged, the new course added.f
  //
  res.send(course);
});

//put is used to update acording the RESTful api principles

router.put('/:id', (req,res)=>{
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

router.delete('/:id', (req,res)=>{
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
  //return the same course
}
);
function validateCourse(course){
  //schema to define joi validation requirement
  //validate requres req.body and schema and returns object to be stored
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
