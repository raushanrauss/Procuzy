const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

let articles = [];
console.log(articles)
async function scrapeMedium(topic) {

    try {
        console.log(topic);
        const browser = await puppeteer.launch({ headless: 2 });
        const page = await browser.newPage();


        await page.goto(`https://medium.com/search?q=${topic}`, { waitUntil: "domcontentloaded" });


        const articleNodes = await page.evaluate((el) => {

            const nodes = document.querySelectorAll('article');
            console.log(nodes);
            return Array.from(nodes).map(node => ({
                title: node.querySelector('h2')?.innerText,
                author: node.querySelector('a>p').innerText,
                publishedDate: node.querySelector('span').innerText,
                url: node.querySelector('.bg.l > div ').getAttribute('data-href')
            }));
        });


        await browser.close();

        return articleNodes;
    } catch (error) {
        console.error('Error during scraping:', error);
        throw error;
    }
}


app.post('/scrape', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        console.log("check");
        const scrapedArticles = await scrapeMedium(topic);

        articles = articles.concat(scrapedArticles);
        res.json({ message: 'Scraping successful', articles: scrapedArticles });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/articles', (req, res) => {
    res.json(articles);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
