/* jshint  esversion: 8 */                                                                                   

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then (()=> console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to mongoDB', err));

//schemas in mongoose (not mongo) define the shape of documents

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date,
    default: Date.now },
  isPublished: Boolean
});

//Schemas has to be compiled into a model

//with model we get a course class into the application
const Course = mongoose.model('Course',courseSchema);

//how to save documents....
//
//
async function createCourse(){
  const course = new Course({
    name: 'Node Course',
    author: 'Mosh',
    tags: ['node', 'backend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

createCourse();


//how to query documents
//this will return all courses found
async function getAllCourses(){
const courses = await Course.find();
console.log(courses);
}
// getAllCourses().catch(error => console.error(error.stack));


//callback style
  // Course.find(function (err, courses) {
  //   if (err) return console.error(err);
  //   console.log(courses);
  // });
//to query filter:
//we pass object with value pairs to find, for filtering


async function getCourses(){
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //lt3 (less than or equal to)
  //in
  //nin(not in)
  const courses = await Course
  // .find({author: 'Mosh',
  //
  // //to use operators we replace value with object containing operator and value isPublished:true})
    // .find({price:{$gt: 10, $lte:20}}) //find course with price > 10 and <=20 
  // .find({price: {$in:[10,15,20]}


  //logicar operators:
  //or
  //and
  //
  //we leave find empty, we put two objects in or/and to 

    .find()
    .or([{author:'Mosh'},{isPublished:true}])
    .find({author:/^Mosh/})
    .find({author:/Hamedani$/i})
    .find({author:/.*Mosh.*/})
    .limit(10)
    .sort({name:1}) //1 indicates ascending order, descending would be -1
    .select({name:1, tags:1}); //select the propierties we want to return
  console.log(courses);
}

// getCourses();

//string will only pick the perfect match
//we need regular expresions to 
