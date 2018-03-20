const axios = require('axios');

const config = require('../../config/igdb.config');

const fetchGames = async (genreGameIds) => {
    const games = await axios.get('https://api-endpoint.igdb.com/genres/?fields=*', {
        headers: {
            'user-key': config.apiKey,
            'Accept': 'application/json',
        },
    });

    console.log(games.data);
};

fetchGames();
