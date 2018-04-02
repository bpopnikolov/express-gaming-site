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

    async update(user, updateInfo) {
        if (updateInfo.email && updateInfo.email !== user.email) {
            user.email = updateInfo.email;
        }

        if (updateInfo.password) {
            user.password = updateInfo.password;
        }

        if (updateInfo.avatar) {
            user.avatar = updateInfo.avatar;
        }

        const savedUser = await user.save();

        return savedUser;
    }
}
module.exports = usersDbWrapper;
