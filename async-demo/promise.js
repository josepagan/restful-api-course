/* jshint  esversion: 8 */                                                                                                    
//anywhere where you have an asyncronous function that takes a call back we should modifyit to return a promise
//

//promise creation, it requires 2 parameters
//once the promise is completed, if it is succesful it will return the resolve function, if failed it will resolve the rejectju1
const prom = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    if (Math.random() > 0.5)  resolve(1);  // the status of promise will change from pending to fulfilled
    else  reject(new Error('message'));  // the status of promise will change from pending to rejected
  }, 2000);
});


//promise consumption
prom.then(result => console.log('Result',result)) //to get the result
  .catch(err => console.log('Error', err.message)); //to get the error

//
//
//
//CONVERTING CALLBACK TO PROMISES

console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log('After');

//callback version
function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
}
//promise version
function getUser(id) {
  return new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    resolve({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
  });
}

//callback version
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}
//promise version
function getRepositories(username) {
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['repo1', 'repo2', 'repo3']);
  }, 2000);
  });
}

//callback version
function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['commit']);
  }, 2000);
}
//promise version
function getCommits(repo) {
  return new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['commit']);
  }, 2000);

  });
}

//promise consumption

console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log('After');


getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err =>console.log('Error', err.message));

//Async and Await approach
//It allows to run async code as syncronous
//
//Every time you call a function that returns a promise you can 'await' the
//result of the promise, and get the result just like calling an async function
//
const user = await getUser(1);
const repos = await getRepositories(user.gitHubUsername);
const commits = await getCommits(repos[0]);
console.log(commits);

//javascript requires that whenever you use await you should have a function
//declarated with async

async function displayCommits(){
  const user = await getUser(1);
  const repos = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repos[0]);
  console.log(commits);
}
displayCommits();


//async/await is just pure syntactic sugar to make .then look more like syncronous
//but when you are 'awaiting' you are not blocking the code, it is async


//await does not have catch so you have to use try/catch blocks

async function displayCommits(){
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch(err) {
    console.log('Error', err.message);

  }
}
displayCommits()
