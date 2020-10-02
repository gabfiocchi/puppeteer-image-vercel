const { getScreenshot } = require("../_lib/chromium");
const { getHtmlPost } = require("../_lib/template");

const axios = require("axios");

const getPost = async (id) => {
    const result = await axios(`https://ci.cafecito.app/api/user/post/${id}`);

    return result.data;
};

const getUser = async (userId) => {
    const result = await axios(`https://ci.cafecito.app/api/user_id/${userId}`);

    return result.data;
};

module.exports = async (req, res) => {
    const {
        query: { id },
    } = req;

    const post = await getPost(id);
    const user = await getUser(post.userId);

    const html = await getHtmlPost({ post, user });

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
