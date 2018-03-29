const dbWrapper = require('../database-wrapper');


const getAll = async () => {
    return dbWrapper.platforms.getAll();
};


module.exports = {
    getAll,
};
