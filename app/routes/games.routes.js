const {
    Router,
} = require('express');

const game = {
    name: 'test123',
};

// async getByName(nameInput) {
//     return this.Model.findOne({
//         where: {
//             name: nameInput,
//         },
//     });
// }

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:name', async (req, res) => {
            res.render('app/games');
        });

    app.use('/games', router);
};

module.exports = {
    init,
};
