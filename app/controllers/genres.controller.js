const dbWrapper = require('../database-wrapper');


const getAll = async (req, res, next) => {
    return dbWrapper.genres.getAll();
};

module.exports = {
    getAll,
};
