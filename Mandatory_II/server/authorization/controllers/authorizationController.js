import { authorizationService } from '../services/authorizationService.js';

export const authorizationController = {
    async getAllUsersWithUserRole() {
        const users = await authorizationService.getAllUsersWithUserRole();
        return users;
    },
};
