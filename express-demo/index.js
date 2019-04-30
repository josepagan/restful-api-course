/* jshint  esversion: 6 */ 

const express = require('express');
const app = express();

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
app.post('api/courses', (req, res) => {
  //we need to create a new course object to inject it in the post reques
  const course = {
    
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
