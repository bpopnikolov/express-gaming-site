const apiReviewsRoutes = require('./api.reviews.routes');


const init = (app, dbWrapper) => {
    apiReviewsRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
