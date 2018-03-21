const gamesApi = require('./games/games');


const getAllGames = async (limit) => {
    const allGames = await gamesApi.fetchAllGames(0, limit, 0, []);

    allGames = allGames.reduce((a, b) => a.concat(b), []);

    return allGames;
};

module.exports = {
    getAllGames,
};
