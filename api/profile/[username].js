const { getScreenshot } = require("../_lib/chromium");
const { getHtmlUsername } = require("../_lib/template");

const axios = require("axios");

const getUser = async (username) => {
    const result = await axios(`https://cafecito.app/api/username/${username}`);

    return result.data;
};

module.exports = async (req, res) => {
    const {
        query: { username },
    } = req;

    const user = await getUser(username);

    const html = await getHtmlUsername(user);

    const fileType = "png";
    const file = await getScreenshot(html, fileType);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
};
