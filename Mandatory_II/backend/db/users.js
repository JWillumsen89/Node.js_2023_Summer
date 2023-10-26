import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/password.js';

let users = [];

function isUserExists(username, email) {
    return users.some(user => user.username === username || user.email === email);
}

export async function createUser(username, email, password) {
    if (isUserExists(username, email)) {
        throw new Error('Username or email already exists');
    }

    const hashedPassword = await hashPassword(password);

    console.log('Hashed password', hashedPassword);

    const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
    };

    console.log('New user', newUser);
    users.push(newUser);
    console.log('Users', users);
    return newUser;
}
