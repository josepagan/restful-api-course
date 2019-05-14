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
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
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
app.use('/api/courses',courses);
app.use('/',home);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
