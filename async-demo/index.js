/* jshint  esversion: 6 */ 

//this is a way to flaten the callback hell
// basically we name the anonymous functions and we call them as reference
//
console.log('Before');
getUser(1, getRepositories);
     
function getRepositories(user){
  console.log('User', user);
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos){
  getCommits(repo,displayCommits);
}

function displayCommits(commits){
  console.log(commits);
}

function getUser(id,callback){
  setTimeout(() => {
    callback({id:id, gitHubUsername: 'Mosh'});
  }, 2000);
}

// syncronous version
// function getRepositories(username){
//   return ['repo1','repo2','repo3'];
// }

//async version
function getRepositories(username, callback){
  setTimeout(() => {
    callback(['repo1','repo2','repo3']);
  }, 2000);
}
