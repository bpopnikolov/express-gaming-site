const axios = require('axios');
const igdb = require('igdb-api-node').default;

const config = require('../../config/igdb.config');
const client = igdb(config.apiKey);

const fetchAllGames = async (requestsCount, limit, offset, allGames) => {
    if (requestsCount === limit) {
        return null;
    }

    const url = `https://api-endpoint.igdb.com/games/?fields=*&expand=collection,franchise,developers,publishers,game_engines,genres&limit=50&offset=${offset}`;

    const games = await axios.get(url, {
        headers: {
            'user-key': config.apiKey,
            'Accept': 'application/json',
        },
    });
    allGames.push(games.data);
    requestsCount++;
    offset = 50;

    await fetchAllGames(requestsCount, limit, offset, allGames);

    return allGames;
};

module.exports = {
    fetchAllGames,
};
