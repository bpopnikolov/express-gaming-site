const parseGame = (obj) => {
    let coverUrl = '';
    if (obj.cover) {
        const cover = obj.cover.url.replace('t_thumb', 't_cover_big');
        coverUrl = `http:${cover}`;
    }
    return {
        name: obj.name,
        summary: obj.summary || '',
        rating: 0,
        ratingCount: 0,
        releaseDate: obj.first_release_date || new Date(0),
        cover: coverUrl || '/public/assets/img/noImg.jpg',
    };
};

const parsePublisher = (obj) => {
    let url = '';
    if (obj.logo) {
        url = `http:${obj.logo.url}`;
    }

    return {
        name: obj.name,
        logo: url || '/public/assets/img/noImg.jpg',
        description: obj.description || '',
        website: obj.website || '',
    };
};

const parseGenre = (obj) => {
    return {
        name: obj.name || '',
    };
};

const parseGameMode = (obj) => {
    return {
        name: obj.name || '',
    };
};


const parseWebsite = (obj) => {
    let url = '';
    if (obj.url) {
        url = obj.url;
    }
    return {
        url: url,
    };
};

const parsePlatform = (obj) => {
    // console.log('---------------------------');
    // console.log(obj);
    // console.log('---------------------------');
    return {
        name: obj.name || '',
    };
};

const parseScreenshot = (obj) => {
    let url = '';
    if (obj.url) {
        const original= obj.url.replace('t_thumb', 't_original');
        url = `http:${original}`;
    }
    return {
        url: url,
    };
};

const parseVideo = (obj) => {
    let url = '';
    if (obj.video_id) {
        url = `https://www.youtube.com/watch?v=${obj.video_id}`;
    }
    return {
        url: url,
    };
};


module.exports = {
    parseGame,
    parseGameMode,
    parseGenre,
    parsePlatform,
    parsePublisher,
    parseScreenshot,
    parseVideo,
    parseWebsite,
};
