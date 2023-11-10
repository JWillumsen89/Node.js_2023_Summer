import { authService } from '../services/authService.js';

export const authController = {
    async signUp(body) {
        const newUser = await authService.signUpUser(body);
        return newUser;
    },
    async login(req, body) {
        const user = await authService.loginUser(req, body);
        return user;
    },
    async checkAndChangePassword(body) {
        await authService.checkAndChangePassword(body);
    },
};
