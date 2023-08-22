// --------------------------------------
// Exercise 3 - Add numbers from string to float

const numberOne = "1.10";
const numberTwo = "2.30";

// add those two numbers and show the result
// you cannot touch line 1 neither line 2
const result1 = Number(numberOne) + Number(numberTwo);
console.log(result1);

// --------------------------------------
// Exercise 4 - Add the numbers and the total with 2 decimals

const anotherNumberOne = "1.10";
const anotherNumberTwo = "2.30";

const result2 = Number(anotherNumberOne) + Number(anotherNumberTwo)
const resultDecimals = result2.toFixed(2);

console.log(resultDecimals);
// --------------------------------------
// Exercise 5 - Decimals and average

const one = 10;
const two = 45;
const three = 98;

const result3 = (one + two + three)/3

console.log(result3.toFixed(5))

// Show in the console the avg. with 5 decimals


// --------------------------------------
// Exercise 6 - Get the character by index

const letters = "abc";

// Get me the character "c"
const letterC = letters.charAt(2);
console.log(letterC)



// --------------------------------------
// Exercise 7 - Replace

const fact = "You are learning javascript!";

const replacedLetter = fact.replace("j", "J");

// capitalize the J in Javascript
console.log(replacedLetter)
// --------------------------------------


