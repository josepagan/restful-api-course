/* jshint  esversion: 8 */                                                                                   
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);



//get all published backed courses
//sort them by name
//pick only their name and author
//and display them

async function getCourses1() {
    const result = await Course
    .find({ isPublished: true, tags: 'backend'  })
    .sort({ name: 1  })
    .select({ name: 1, author: 1  });
    console.log(result);
  
}

//get all published front and backend courses
//sorthem by ther price in a descending order
//pick only their name and author
//and display them
async function getCourses2() {
  return await Course
  .find({isPublished:true,tags: {$in: ['frontend','backend']}})
  .sort({ price: -1 })
  .select({ name: 1, author: 1 });
}

//get all published courses that are $10 or more
//have "by" in the title

async function getCourses3() {
  return await Course
  .find()
    .or([{price:{$gte:15}},{name: /.*by.*/i}]);
  // .sort({ price: -1 })
  // .select({ name: 1, author: 1 });
}


async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
