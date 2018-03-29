const dbWrapper = require('../database-wrapper');


const getAll = async () => {
    return dbWrapper.genres.getAll();
};


module.exports = {
    getAll,
};
