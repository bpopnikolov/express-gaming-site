// const dbWrapper = require('../database-wrapper');


class UsersController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    async editUserProfile(user, updateInfo) {
        const savedUser = await this.dbWrapper.users.update(user, updateInfo);

        return savedUser;
    }

    async getUserByUsername(username) {
        const user = await this.dbWrapper.users
            .getByUsername(username);

        return user;
    }
}

module.exports = UsersController;
