import bcrypt from 'bcrypt';

const saltRounds = 14;

const plainTextPassword = 'password123';

const hashedPasswordOutput = '$2b$14$Of4TOVzWPhLKXJwsUwWOl.SxmuM1.rtnRK6qypMeXw7K.jr8JkDvm';
//const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

const compareResult = await bcrypt.compare(plainTextPassword, hashedPasswordOutput);

console.log(compareResult);
