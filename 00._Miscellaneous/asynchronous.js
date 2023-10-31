/*
    JS is single-threaded (runs on a main thread)
    That's why we want to avoid blocking code.
    
    Asynchronous code is needed
    Over a network
    Buffers, Ex. Email (SMTP)
    Database
    CRON jobs
    File system (files, folders)
    User input (mouse, keyboard, event handlers)

    Asynchronous code:

    Solution 1: Callbacks
    Cons: Callback hell, Pyramid of doom

    Solution 2: Promises
    States:
    - Pending
    - Fulfilled
        - Resolved
        - Rejected
    Cons: More chars, less readable, nesting leads to pyramid of doom

    Solution 3: Async/Await
    Syntactic sugar



*/
/*
new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Promise worked out!');
        reject("Promise didn't work out!");
    }, 3000);
})
    .then(successMessage => {
        console.log(successMessage);
    })
    .catch(errorMessage => {
        console.log(errorMessage);
    });*/

/* Task: Create a promisified function this is, a function that returns a promise
    it should be called myPromise and it should either resolve as "Something good" or reject as "Something bad"
    create a timeout of 2 seconds to simulate asynchronous behavior */

function myPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                throw 'Something bad';
                resolve('Something good');
            } catch (errorMessage) {
                reject('Something bad');
            }
        }, 2000);
    });
}
/*
myPromise()
    .then(message => {
        console.log('Success Message:', message);
    })
    .catch(message => {
        console.log('Error Message:', message);
    });
*/
/*Task create a myFetch function that takes a certain amount of time
    it should return some response
    be creative*/

function myFetch(URL, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                json: () =>
                    new Promise((resolve, reject) =>
                        resolve({
                            data: 'Response',
                        })
                    ),
            });
        }, 2000);
    });
}
/*
myFetch('URL')
    .then(response => response.json())
    .then(result => console.log(result));*/

//const result = await myPromise();

async function main() {
    const response = await myFetch();

    const result = await response.json();
    console.log(result);
}

//main();

async function callMyPromise() {
    try {
        const result = await myPromise();
        console.log(result);
    } catch (errorMessage) {
        console.log(errorMessage);
    }
}

callMyPromise();

//Pick one! either async/await or Promises

async function handleAllPromises() {
    const result = Promise.all([myFetch, myPromise]);
    console.log(result);
}

handleAllPromises();
