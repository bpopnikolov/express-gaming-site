const path = require('path');
const bcrypt = require('bcrypt');

const generateFilenameHash = async (file) => {
    const fileName = path.basename(file.originalname,
        path.extname(file.originalname));
    const fileExt = path.extname(file.originalname);

    const hash = await bcrypt.hash(fileName + Date.now(), 7);

    return hash.replace(/\W+/g, '') + fileExt;
};

module.exports = {
    generateFilenameHash,
}
