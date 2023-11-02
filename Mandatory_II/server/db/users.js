import { v4 as uuidv4 } from 'uuid';
import { hashPassword, comparePassword, isValidPassword } from '../utils/password.js';
import { db, storage, app } from '../db/firebase.js';
import { doc, addDoc, getDocs, collection, updateDoc, deleteDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
/*
let users = [];

function isUserExists(username, email) {
    let userExists = {
        username: false,
        email: false,
    };

    users.forEach(user => {
        if (user.username === username) {
            userExists.username = true;
        }
        if (user.email === email) {
            userExists.email = true;
        }
    });

    return userExists;
}

export async function createUser(username, email, password, role = 'user') {
    const existingUser = isUserExists(username, email);

    if (existingUser.username && existingUser.email) {
        throw new Error('Both username and email already exist');
    } else if (existingUser.username) {
        throw new Error('Username already exists');
    } else if (existingUser.email) {
        throw new Error('Email already exists');
    }

    if (username === 'Jonathan') {
        role = 'admin';
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        role,
    };

    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function loginUser(loginInput, password) {
    const user = users.find(u => u.username === loginInput || u.email === loginInput);
    if (!user) {
        throw new Error('Username or email is incorrect');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
*/

export async function createUser(username, email, password, role = 'user') {
    const userQuery = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
        throw new Error('Username already exists');
    }

    const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    const emailQuerySnapshot = await getDocs(emailQuery);

    if (!emailQuerySnapshot.empty) {
        throw new Error('Email already exists');
    }
    try {
        if (isValidPassword(password)) {
            console.log('Password is valid.');
        }
    } catch (error) {
        throw new Error(error.message);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
        role,
    };

    await addDoc(collection(db, 'users'), newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function loginUser(loginInput, password) {
    console.log('loginUser', loginInput, password);

    let userQuery = query(collection(db, 'users'), where('username', '==', loginInput));
    let querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
        userQuery = query(collection(db, 'users'), where('email', '==', loginInput));
        querySnapshot = await getDocs(userQuery);
        if (querySnapshot.empty) {
            throw new Error('Username or email is incorrect');
        }
    }

    let user;
    querySnapshot.forEach(doc => {
        user = doc.data();
    });

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
