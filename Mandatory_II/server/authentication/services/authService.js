import { createUser, loginUser, checkAndChangePassword } from '../../db/users.js';

export const authService = {
    async signUpUser(userData) {
        return createUser(userData.username, userData.email, userData.password, userData.role, userData.createdAt, userData.updatedAt);
    },
    async loginUser(req, userData) {
        const user = await loginUser(userData.username, userData.password);
        req.session.user = user;
        return user;
    },

    async checkAndChangePassword(userData) {
        console.log('Data: ', userData);
        await checkAndChangePassword(userData.username, userData.currentPassword, userData.newPassword);
    },
};
