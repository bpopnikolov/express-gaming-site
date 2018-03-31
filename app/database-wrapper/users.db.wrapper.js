const genericDbWrapper = require('./generic.db.wrapper');

const {
    User,
} = require('../../db/models');

class usersDbWrapper extends genericDbWrapper {
    constructor() {
        super(User, []);
    }

    async getByEmail(email) {
        const user = User.findOne({
            where: {
                email: email,
            },
        });

        return user;
    }

    async getByUsername(username) {
        const user = User.findOne({
            where: {
                username: username,
            },
        });

        return user;
    }

    async findOrCreate(user) {
        const savedUser = await this.Model.findCreateFind({
            where: user,
        });

        if (!savedUser.created) {
            return false;
        }

        return savedUser[0];
    }
}
module.exports = usersDbWrapper;
