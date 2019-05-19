/* jshint  esversion: 8 */                                                                                   

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/freecodecamp-learning-mongoose')
  .then (()=> console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to mongoDB', err));

const Schema1 = new mongoose.Schema({
  name: String,
});

const DocumentModel = mongoose.model('Document',Schema1);

async function createDocument(){
  const document = new DocumentModel({
    name: 'document name'
  });
  const result = await document.save();
  console.log(result);
}



async function getAllDocuments(){
  return await DocumentModel.find().select({name:1});//.count();
}


getAllDocuments().then(a=>{console.log(a)})






//async function getCourses(){
//  //eq (equal)
//  //ne (not equal)
//  //gt (greater than)
//  //gte (greater than or equal to)
//  //lt (less than)
//  //lt3 (less than or equal to)
//  //in
//  //nin(not in)
//  const courses = await Course
//  // .find({author: 'Mosh',
//  //
//  // //to use operators we replace value with object containing operator and value isPublished:true})
//    // .find({price:{$gt: 10, $lte:20}}) //find course with price > 10 and <=20 
//  // .find({price: {$in:[10,15,20]}


//  //logicar operators:
//  //or
//  //and
//  //
//  //we leave find empty, we put two objects in or/and to 

//    .find()
//    .or([{author:'Mosh'},{isPublished:true}])
//    .find({author:/^Mosh/})
//    .find({author:/Hamedani$/i})
//    .find({author:/.*Mosh.*/})
//    .limit(10)
//    .sort({name:1}) //1 indicates ascending order, descending would be -1
//    .select({name:1, tags:1}); //select the propierties we want to return
//  console.log(courses);
//}

//// getCourses();

////string will only pick the perfect match
////we need regular expresions to 
