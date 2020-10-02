const fs = require("fs");
const { join } = require("path");

const handlebars = require("handlebars");

const twemoji = require("twemoji");

const getUrlPhoto = (image) => {
    let urlPhoto = image.profile;

    if (
        urlPhoto &&
        !urlPhoto.includes("http:") &&
        !urlPhoto.includes("https:")
    ) {
        urlPhoto = `https://cafecito.app/static/images_profile/${image.profile}`;
    } else if (!urlPhoto) {
        urlPhoto = `https://cdn.cafecito.app/imgs/circle-logo.png`;
    }

    return urlPhoto;
};

module.exports = {
    getHtmlPost: async ({ post, user: { name, username, image } }) => {
        const html = await new Promise((resolve, reject) => {
            const file = join(__dirname, "../_files", "post.html");

            fs.readFile(file, "utf8", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        const imageProfile = getUrlPhoto(image);

        const template = handlebars.compile(html);
        const htmlBuilded = template({
            name,
            username,
            imageProfile,
            title: post.title,
        });

        return twemoji.parse(htmlBuilded);
    },

    getHtmlUsername: async ({ user: { name, username, image } }) => {
        const html = await new Promise((resolve, reject) => {
            const file = join(__dirname, "../_files", "profile.html");

            fs.readFile(file, "utf8", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        const imageProfile = getUrlPhoto(image);

        const template = handlebars.compile(html);
        const htmlBuilded = template({ name, username, imageProfile });

        return twemoji.parse(htmlBuilded);
    },

    getHtmlCoffee: async ({
        user: { name, image },
        coffee: { name: nameCoffee, message, countCoffees },
    }) => {
        const html = await new Promise((resolve, reject) => {
            const file = join(__dirname, "../_files", "coffee.html");

            fs.readFile(file, "utf8", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        const imageProfile = getUrlPhoto(image);

        const template = handlebars.compile(html);

        name = name ? name : "Anónimo";

        countCoffees = `Te compró ${countCoffees} ${
            countCoffees > 1 ? "cafecitos" : "cafecito"
        }`;

        const htmlBuilded = template({
            name,
            imageProfile,
            nameCoffee,
            message,
            countCoffees,
        });

        return twemoji.parse(htmlBuilded);
    },
};
