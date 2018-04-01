const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isImage = (filename) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return allowedExtensions.exec(filename);
};

module.exports = {
    validateEmail,
    isImage,
};
