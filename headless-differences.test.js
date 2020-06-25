const puppeteer = require('puppeteer-extra')

describe('headless differences Test', () => {

    test("headless and not headless screenshot should to be the same", async () => {
        jest.setTimeout(60000)
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {width: 1800, height: 900},
            args: ["--start-maximized"],
            devtools: false
        })
        page = await browser.newPage()
        await page.goto("https://legaltest.solutiondocondemand.com", {
            timeout: 20000,
            waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
        })
        await page.waitFor(5000)
        loginBox = await page.waitForSelector('#loginBox', {visible: true, timeout:30000})

        //removing time variant area
        await page.evaluate(() => {
            document.querySelector('#lblNow').style.visibility = "hidden"
        })

        await page.screenshot({
            path:"gui.png"
        })

        await browser.close()
    })
})
