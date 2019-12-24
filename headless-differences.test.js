const puppeteer = require('puppeteer-extra')
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
expect.extend({ toMatchImageSnapshot });

describe('headless differences Test', () => {

    test("headless and not headless screenshot should to be the same", async () => {
        jest.setTimeout(15000)
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {width: 1800, height: 900},
            args: ["--start-maximized"],
            devtools: false,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        })
        page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
        await page.goto("https://legaltest.solutiondocondemand.com", {
            timeout: 20000,
            waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
        })
        loginBox = await page.waitForSelector('#loginBox', {visible: true, timeout:30000})

        //removing time variant area
        await page.evaluate(() => {
            document.querySelector('#lblNow').style.visibility = "hidden"
        })

        //taking screenshot
        const loginBoxScreenshot = await loginBox.screenshot()
        expect(loginBoxScreenshot).toMatchImageSnapshot({
            failureThreshold: 0,
            failureThresholdType: "percent"
        })
        await browser.close()
    })
})
