const axios = require('axios');
const igdb = require('igdb-api-node').default;

const config = require('../../config/igdb.config');
const client = igdb(config.apiKey);

const fetchAllGames = async (requestsCount, limit, offset, allGames) => {
    if (requestsCount === limit) {
        return null;
    }

    const url = `https://api-endpoint.igdb.com/games/?fields=*&expand=collection,franchise,developers,publishers,game_engines,game_modes,genres&limit=50&offset=${offset}`;

    const games = await axios.get(url, {
        headers: {
            'user-key': config.apiKey,
            'Accept': 'application/json',
        },
    });
    requestsCount++;
    allGames.push(games.data);
    offset = 50;

    await fetchAllGames(requestsCount, limit, offset, allGames);

    return allGames;
};

// fetchAllGames(0, 1, 0, []);


module.exports = {
    fetchAllGames,
};
