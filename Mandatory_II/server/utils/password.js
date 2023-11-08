import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 14;
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

export function isValidPassword(password) {
    const minLength = 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    /*
    Out comment this if i want to use special characters in passwords
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Define special characters

    if (! (password.length >= minLength && hasLowercase && hasUppercase && hasNumber && hasSpecialChar)) {
        throw new Error("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.");
    }*/

    if (!(password.length >= minLength && hasLowercase && hasUppercase && hasNumber)) {
        throw new Error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.');
    }
    return true;
}
