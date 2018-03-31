const dbWrapper = require('../database-wrapper');
const errorsConfig = require('../config/errors.config');
const validator = require('../utils/validator');

const apiEditUserProfile = async (req, res, next) => {
    console.log('API EDIT');
    if (!req.isAuthenticated()) {
        return res.status(401).json(errorsConfig.unauthorizedError);
    }

    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;

    if (email && validator.validateEmail(email)) {
        req.user.email = email;
    }

    if (avatar) {
        // save avatar
    }

    if (password) {
        req.user.password = password;
    }

    const savedUser = await req.user.save();
    req.logIn(savedUser, (err) => {
        console.log(savedUser);
        res.send(200);
    });

};

const getUserProfile = async (req, res, next) => {
    const username = req.params.username;

    const user = await dbWrapper.users.getByUsername(username);

    if (user) {
        // render user profile page
    }

    if (req.isAuthenticated()) {
        if (req.user.username === user.username) {
            res.redirect('/users/profile/edit');
        }
    }

    // else go to page not found

    next();
};

module.exports = {
    apiEditUserProfile,
    getUserProfile,
};
