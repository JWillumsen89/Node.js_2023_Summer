import { createUser, loginUser } from '../../db/users.js';

export const authService = {
    async signUpUser(userData) {
        return createUser(userData.username, userData.email, userData.password, userData.role, userData.createdAt, userData.updatedAt);
    },
    async loginUser(req, userData) {
        const user = await loginUser(userData.username, userData.password);
        req.session.user = user;
        return user;
    },
};
