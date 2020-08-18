const { getScreenshot } = require("./_lib/chromium");
const { getHtml } = require("./_lib/template");

module.exports = async (req, res) => {
    const html = await getHtml();

    const fileType = "jpeg";
    const file = await getScreenshot(html, fileType);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
};
