const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe('Google Test', () => {

    test("Google Logo", async () => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {width: 1800, height: 900},
            args: ["--start-maximized"],
            devtools: false
        })
        page = await browser.newPage()
        await page.goto("https://www.google.com", {
            timeout: 20000,
            waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
        })
        logo = await page.waitForSelector('#hplogo', {visible: true, timeout:30000})
        const selectorScreenshot = await logo.screenshot()
        expect(selectorScreenshot).toMatchImageSnapshot({
            failureThreshold: 0,
            failureThresholdType: "percent",
            diffDirection: "vertical"
        })
        await browser.close()

    })

})
