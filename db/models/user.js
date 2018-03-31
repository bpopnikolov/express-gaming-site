'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z]+$/i,
            },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-z]+$/i,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    User.hook('beforeValidate', async (user, option) => {
        user.username = user.email.substring(0, user.email.lastIndexOf('@'));

        if (!user.avatar) {
            user.avatar = '/public/assets/img/no_user_avatar.png';
        }
    });

    User.hook('beforeSave', async (user, option) => {
        const SALT_FACTOR = 5;

        if (!user.changed('password')) {
            return user;
        }

        const hash = await bcrypt.hash(user.password, SALT_FACTOR);
        user.password = hash;

        return user;
    });

    User.prototype.comparePassword = async function(passwordAttempt) {
        const user = this;

        const isMatch = bcrypt.compare(passwordAttempt, user.password);

        return isMatch;
    };

    User.associate = (models) => {
        // associations can be defined here
    };
    return User;
};
