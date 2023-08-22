// Use const where possible
const scheduledBreakTime = "09:27";
let consoleLogCounter = 0;

//Use comma in console log
console.log("Lets take a break!!", scheduledBreakTime);
consoleLogCounter++;
//Datatypes
//String, Number, Boolean, BigInteger, undefined, null, Object, Symbol
//Object: Object, Array, Date

//Type coercion
// 2 + "2" = 22

//How to make strings

//The 3 ways to make strings
//Can contain single quotes
console.log("This is the first '''' way");
//Can contain double quotes
console.log('This is the second """" way');
//Can contain both and ${expression} and you can make multiline string literal
console.log(`This is the third """''' way ${2 + 2}`);
consoleLogCounter += 3;

console.log(consoleLogCounter);
