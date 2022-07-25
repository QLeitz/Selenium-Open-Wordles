const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function openChromeWindowToURLList(urls) {
  try {
    if (!urls) return;
    const urlCount = urls.length;

    async function openTabToURL(url) {
      await driver.switchTo().newWindow("tab");
      await driver.get(url);
    }

    let options = new chrome.Options();
    options.excludeSwitches("enable-logging");

    //Make a webdriver instance
    let driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser("chrome")
      .build();

    let originalWindow;
    for (const [i, url] of urls.entries()) {
      if (i === 0) {
        await driver.get(url);
        originalWindow = await driver.getWindowHandle();
      } else {
        await openTabToURL(url);
      }
    }
    // Navigate back to the original tab
    driver.switchTo().window(originalWindow);
  } catch (error) {
    console.log(error);
  }
}

const URLs = [
  "https://www.nytimes.com/games/wordle/index.html",
  "https://worldle.teuteuf.fr/",
  "https://www.spotify.com/heardle/",
  "https://likewisetv.com/arcade/moviedle",
  "https://globle-game.com/game",
];

openChromeWindowToURLList(URLs);
