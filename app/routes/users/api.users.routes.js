/* globals __dirname */
const {
    Router,
} = require('express');
const path = require('path');
const multer = require('multer');

const UsersController = require('../../controllers/users.controller');
const errorsConfig = require('../../config/errors.config');
const validator = require('../../utils/validator');
const hasher = require('../../utils/hasher');

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        // console.log(file);
        cb(null, path.join(__dirname, '..', '..', '..', '/public/uploads/'));
    },
    filename: async function(req, file, cb) {
        const hash = await hasher.generateFilenameHash(file);

        cb(null, hash);
    },
});

const upload = multer({
    storage: storage,
});

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new UsersController(dbWrapper);

    router.post('/profile/edit', upload.any(), async (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json(errorsConfig.unauthorizedError);
        }

        const user = req.user;
        const email = req.body.email;
        const password = req.body.password;
        const avatar = req.files[0];

        const updateInfo = {
            email: '',
            avatar: '',
            password: '',
        };

        if (email && validator.validateEmail(email)) {
            updateInfo.email = email;
        }

        if (avatar) {
            if (!validator.isImage(avatar.originalname)) {
                return res.status(400).json(errorsConfig.notImageError);
            }
            updateInfo.avatar = `/public/uploads/${avatar.filename}`;
        }

        if (password) {
            updateInfo.password = password;
        }

        const savedUser = await controller.editUserProfile(user, updateInfo);

        req.logIn(savedUser, (err) => {
            // console.log(savedUser);
            res.status(200).json({
                avatar: savedUser.avatar,
                email: savedUser.email,
            });
        });
        return null;
    });

    app.use('/api/users', router);
};

module.exports = {
    init,
};
