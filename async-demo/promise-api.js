const p1 = new Promise((resolve) => {
  setTimeout(()=> {
    console.log('Async operation 1...');
    resolve(1);
  }, 2000);
});


const p2 = new Promise((resolve) => {
  setTimeout(()=> {
    console.log('Async operation 2...');
    resolve(2);
  }, 3000);
});

//when both promised are fulfilled the result will appear on an array
Promise.all([p1,p2]).then(result => console.log(result));
//when race as soon as one promised is fulfilled the whole promised will be fulfilled
Promise.race([p1,p2]).then(result => console.log(result));

