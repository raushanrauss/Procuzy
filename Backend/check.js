const puppeteer = require('puppeteer');


const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://medium.com/");
    const articleNodes = await page.evaluate(() => {
        const nodes = document.querySelectorAll('s');
        return Array.from(nodes).map(node => {
            title: node.querySelector('h2').innerText;
            return  {title }
        });
    });
    console.log(articleNodes);
}

main();


// Print the full title.
