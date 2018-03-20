const axios = require('axios');

const config = require('../../config/igdb.config');

const fetchGenres = async () => {
    const genres = await axios.get('https://api-endpoint.igdb.com/genres/?fields=*', {
        headers: {
            'user-key': config.apiKey,
            'Accept': 'application/json',
        },
    });

    console.log(genres.data);
};


fetchGenres();
