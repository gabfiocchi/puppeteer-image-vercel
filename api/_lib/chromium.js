const chromium = require("chrome-aws-lambda");

const getPage = async () => {
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    return page;
};

module.exports = {
    getScreenshot: async (html, type) => {
        const page = await getPage();
        await page.setViewport({ width: 1500, height: 750 });
        await page.setContent(html);
        const file = await page.screenshot({ type });
        return file;
    },
};
