import puppeteer from "puppeteer";
import fs from "fs/promises";

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage();
  await page.goto("https://example.com");

  await browser.close();
}

// openWebPage();

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 700,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");

  await page.screenshot({ path: "example.png" });

  await browser.close();
}

// captureScreenshot();

async function loginToWebSite() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400,
    });
    const page = await browser.newPage();
    await page.goto("https://quotes.toscrape.com");

    await page.click("a[href='/login']");

    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']", "admin");

    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']", "admin");

    await page.click("input[value='Login']");

    await browser.close();
}

// loginToWebSite();

async function scrapeData() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400,
        executablePath: '/bin/chromium-browser',
    });
    const page = await browser.newPage();
    await page.goto("https://quotes.toscrape.com");

    const quotes = await page.evaluate(() => {
        const quotes = [];
        document.querySelectorAll(".quote").forEach((quote) => {
            const text = quote.querySelector(".text").innerText;
            const author = quote.querySelector(".author").innerText;
            quotes.push({ text, author });
        });
        return quotes;
    });

    console.log(quotes);

    await fs.writeFile("quotes.json", JSON.stringify(quotes, null, 2));

    await browser.close();
}

scrapeData();