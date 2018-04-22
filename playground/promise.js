let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //Promise can be resolved or rejected only once.
        console.log('called first')
        resolve('It worked.');    
        reject('Not happening!')
    }, 2500);
});

somePromise.then((message) => {
    console.log('Success: ', message);
})
.catch((error) => {
    console.log('Failed: ',error);
})