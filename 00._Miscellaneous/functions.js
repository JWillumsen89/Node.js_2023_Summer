//hoisting
console.log(getRandomInt());

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

//Prints the reference
console.log(getRandomInt);

// Prints the return value. In JavaScript, you can call a function without supplying all its arguments, 
// but it might lead to unexpected results if the function expects them.
console.log(getRandomInt());


const getRandomIntAnonymousFunction = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const getRandomIntArrowFunction = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const getRandomIntArrowFunctionWithoutReturn = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

const result = getRandomIntArrowFunction(1, 100);

console.log(result);

//Callback is a function as an reference that is getting passed as an argument.

// A function that takes a callback function as argument
function sayHello(callback) {
  console.log("Hi, this is before callback!");

  // Here we call the callback function
  callback();
}

// actual callback function
function myCallback() {
  console.log("Hi, this is inside the callback!");
}
// Here we call the function and pass the callback af an argument
sayHello(myCallback);

//function with reference function as argument
function genericActionPerformer(genericAction, name) {
  //do things
  return genericAction(name);
}

//Function/arrow function
const jump = (name) => `${name} is jumping`;

//Lasse is jumping
console.log(genericActionPerformer(jump, "Lasse"));

//ASI automatic semicolon insertion

const run = (name) => `${name} is running`;

console.log(genericActionPerformer(run, "Jonathan"));

function run2(name) {
  return `${name} is running`
}

console.log(genericActionPerformer(run2, "Thomas"));

//Desired result is "Daniel is sleeping"
//Create a sleep callback and get the desired result
//in a single statement

//Not preferred
console.log(genericActionPerformer(function(name){return `${name} is sleeping`}, "Daniel"))
//Arrow functions preferred
console.log(genericActionPerformer((name) => `${name} is sleeping`, "Daniel"));