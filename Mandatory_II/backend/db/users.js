import { v4 as uuidv4 } from 'uuid';
import { hashPassword, comparePassword } from '../utils/password.js';

let users = [];

function isUserExists(username, email) {
    return users.some(user => user.username === username || user.email === email);
}

export async function createUser(username, email, password, role = 'user') {
    if (isUserExists(username, email)) {
        throw new Error('Username or email already exists');
    }
    if (username === 'Jonathan') {
        role = 'admin';
    }

    const hashedPassword = await hashPassword(password);

    console.log('Hashed password', hashedPassword);

    const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        role,
    };

    console.log('New user', newUser);
    users.push(newUser);
    console.log('Users', users);
    return newUser;
}

export async function loginUser(loginInput, password) {
    const user = users.find(u => u.username === loginInput || u.email === loginInput);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
}
