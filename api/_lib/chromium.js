const chromium = require("chrome-aws-lambda");

const exePath =
    process.platform === "win32"
        ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "linux"
        ? "/usr/bin/google-chrome"
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const isDev = false;

const getPage = async () => {
    const browser = await chromium.puppeteer.launch({
        args: isDev ? [] : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: isDev ? exePath : await chromium.executablePath,
        headless: isDev ? true : chromium.headless,
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
