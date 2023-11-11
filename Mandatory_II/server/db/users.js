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

export async function createUser(username, email, password, role = 'user', createdAt, updatedAt) {
    username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase().replace(/\s/g, '');
    email = email.charAt(0).toUpperCase() + email.slice(1).toLowerCase();

    if (/\s/.test(username)) {
        throw new Error('Username cannot contain whitespace');
    }

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
        username,
        email,
        password: hashedPassword,
        role,
        createdAt,
        updatedAt,
    };
    console.log(newUser);
    await addDoc(collection(db, 'users'), newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function loginUser(loginInput, password) {
    console.log('loginUser', loginInput, password);

    if (loginInput.includes('@')) {
        loginInput = loginInput.charAt(0).toUpperCase() + loginInput.slice(1).toLowerCase();
    } else {
        loginInput = loginInput.charAt(0).toUpperCase() + loginInput.slice(1).toLowerCase().replace(/\s/g, '');
    }

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

    const isCurrentPasswordValid = await comparePassword(password, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function checkAndChangePassword(username, oldPassword, newPassword) {
    let userQuery = query(collection(db, 'users'), where('username', '==', username));
    let querySnapshot = await getDocs(userQuery);

    console.log('querySnapshot', querySnapshot);

    let user;
    let userDocId;
    querySnapshot.forEach(doc => {
        user = doc.data();
        userDocId = doc.id;
    });
    console.log('user', user);

    const isCurrentPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error('Invalid password');
    }

    try {
        if (isValidPassword(newPassword)) {
            console.log('Password is valid.');
        }
    } catch (error) {
        throw new Error(error.message);
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = {
        ...user,
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
    };

    const userRef = doc(db, 'users', userDocId);
    await updateDoc(userRef, updatedUser);

    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
}

export async function getAllUsersWithUserRole() {
    const users = [];
    const userQuery = query(collection(db, 'users'), where('role', '==', 'user'));
    const querySnapshot = await getDocs(userQuery);

    querySnapshot.forEach(doc => {
        const { password: _, ...userWithoutPassword } = doc.data();
        users.push(userWithoutPassword);
    });

    return users;
}

export async function editProfile(oldUsername, newUsername, oldEmail, newEmail) {
    newUsername = newUsername.charAt(0).toUpperCase() + newUsername.slice(1).toLowerCase().replace(/\s/g, '');
    newEmail = newEmail.charAt(0).toUpperCase() + newEmail.slice(1).toLowerCase();

    // Check for whitespace in new username
    if (/\s/.test(newUsername)) {
        throw new Error('Username cannot contain whitespace');
    }
    
    let userQuery = query(collection(db, 'users'), where('username', '==', oldUsername));
    let querySnapshot = await getDocs(userQuery);

    let user;
    let userDocId;
    querySnapshot.forEach(doc => {
        user = doc.data();
        userDocId = doc.id;
    });

    if (oldUsername !== newUsername) {
        const usernameQuery = query(collection(db, 'users'), where('username', '==', newUsername), where('__name__', '!=', userDocId));
        const usernameQuerySnapshot = await getDocs(usernameQuery);

        if (!usernameQuerySnapshot.empty) {
            throw new Error('Username already exists');
        }
    }

    if (oldEmail !== newEmail) {
        const emailQuery = query(collection(db, 'users'), where('email', '==', newEmail), where('__name__', '!=', userDocId));
        const emailQuerySnapshot = await getDocs(emailQuery);

        if (!emailQuerySnapshot.empty) {
            throw new Error('Email already exists');
        }
    }

    const updatedUser = {
        ...user,
        username: newUsername,
        email: newEmail,
        updatedAt: new Date().toISOString(),
    };

    const userRef = doc(db, 'users', userDocId);
    await updateDoc(userRef, updatedUser);

    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
}
