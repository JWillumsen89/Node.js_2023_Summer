import { getAllUsersWithUserRole } from "../../db/users.js";

export const authorizationService = {

  async getAllUsersWithUserRole() {
    const users = await getAllUsersWithUserRole();
    return users;
  }

};
