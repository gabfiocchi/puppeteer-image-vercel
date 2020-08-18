const fs = require("fs");
const { join } = require("path");

module.exports = {
    getHtml: async () => {
        const html = await new Promise((resolve, reject) => {
            const file = join(__dirname, "../_files", "profile.html");

            fs.readFile(file, "utf8", (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });

        return html;
    },
};
