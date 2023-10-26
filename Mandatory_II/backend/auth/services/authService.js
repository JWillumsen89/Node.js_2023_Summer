import { createUser } from '../../db/users.js';

export const authService = {
    async registerUser(userData) {
        return createUser(userData.username, userData.email, userData.password);
    },
};
