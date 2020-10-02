const { getScreenshot } = require("../_lib/chromium");
const { getHtmlCoffee } = require("../_lib/template");

const axios = require("axios");

const getCoffee = async (id) => {
    const result = await axios(`https://cafecito.app/api/coffee/${id}`);

    return result.data;
};

const isHtmlDebug = false;

module.exports = async (req, res) => {
    const {
        query: { id },
    } = req;

    const coffee = await getCoffee(id);

    const html = await getHtmlCoffee(coffee);

    if (isHtmlDebug) {
        res.setHeader("Content-Type", "text/html");
        res.end(html);
        return;
    }

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
