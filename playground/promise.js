let asynAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }else{
                reject('Not a number')
            }
        },3000)
    });
}

asynAdd(2,5).then((result) => {
    console.log(`Result: ${result}`);
    return asynAdd(result,3);
},(error) => {
    console.log(error)
    return Promise.reject(error);
})
.then((result) => {
    console.log(`Result should be 10 ${result}`);
},(error) => {
    console.log(error)
})
.catch((error) => {
    console.log(error)
});

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