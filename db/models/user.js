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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});

    User.hook('beforeSave', async (user, next) => {
        const SALT_FACTOR = 5;

        if (!user.changed('password')) {
            return next();
        }

        const hash = await bcrypt.hash(user.password, SALT_FACTOR);
        user.password = hash;

        return next();
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
