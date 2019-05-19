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






//updating documents  2 approaches
  //Approach: Query first
  //findById()
  //Modify its properties
  //save()
  //
async function updateCourse(id){

const course = Course.findById(id); 
  if (!course) return;
  // course.isPublished = true;
  // course.author = 'Another Author'
  course.set({isPublished: true,
  author: 'Another Author'})
  const result = await course.save();
  console.log(result)
}
updateCourse();


async function updateCourse2(id){
  const  result = await Course.update({_id:id},{
    //mongodb update operators go here
    $set:{
      author: 'Mosh',
      isPublished: false
    }
  });
}

//if we want to return the document directly


async function updateCourse2(id){
  //it will return an object
  const  course = await Course.findByIdAndrUpdate({_id:id},{
    //mongodb update operators go here
    $set:{
      author: 'Mosh',
      isPublished: false
    }
    //that last object is necesary if we want to get the updated course and not the old one
  },{new:true});
  console.log(course);
}




async function removeCourse(id){
  const result = await  Course.deleteOne({_id:id});
  console.log(result)
}


async function removeCourse(id){
  const result = await  Course.deleteMany({_id:id});
  console.log(result)
}


