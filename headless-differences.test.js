const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe('headless differences Test', () => {

    test("headless and not headless screenshot should to be the same", async () => {
        jest.setTimeout(15000)
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {width: 1800, height: 900},
            args: ["--start-maximized"],
            devtools: false
        })
        page = await browser.newPage()
        await page.goto("https://legaltest.solutiondocondemand.com", {
            timeout: 20000,
            waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
        })
        loginBox = await page.waitForSelector('#loginBox', {visible: true, timeout:30000})
        const loginBoxScreenshot = await loginBox.screenshot()
        expect(loginBoxScreenshot).toMatchImageSnapshot({
            failureThreshold: 0,
            failureThresholdType: "percent",
            diffDirection: "vertical"
        })
        await browser.close()

    })


})