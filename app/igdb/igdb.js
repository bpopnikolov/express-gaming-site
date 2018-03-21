const gamesApi = require('./games/games');


const getAllGames = async (limit) => {
    let allGames = await gamesApi.fetchAllGames(0, limit, 0, []);

    allGames = allGames.reduce((a, b) => a.concat(b), []);
    console.log(allGames);
    return allGames;
};

getAllGames(2);
module.exports = {
    getAllGames,
};
