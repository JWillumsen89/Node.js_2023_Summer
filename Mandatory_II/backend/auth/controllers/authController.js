import { authService } from '../services/authService.js';

export const authController = {
    async register(body) {
        const newUser = await authService.registerUser(body);
        return newUser; // Return the new user
    },
};
