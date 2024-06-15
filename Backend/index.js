const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

let articles = [];

async function scrapeMedium(topic) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to Medium's search page for the given topic
        await page.goto(`https://medium.com/search?q=${topic}`);

        // Function to extract article details from a single page
        const articleNodes = await page.evaluate(() => {
            const nodes = document.querySelectorAll('div.postArticle');
            return Array.from(nodes).map(node => ({
                title: node.querySelector('h3').innerText,
                author: node.querySelector('a.ds-link').innerText,
                publicationDate: node.querySelector('time').getAttribute('datetime'),
                url: node.querySelector('a.postArticle-content').getAttribute('href')
            }));
        });

        // Close the browser
        await browser.close();

        return articleNodes;
    } catch (error) {
        console.error('Error during scraping:', error);
        throw error;
    }
}

// POST /scrape endpoint
app.post('/scrape', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    try {
        const scrapedArticles = await scrapeMedium(topic);
        articles = articles.concat(scrapedArticles);
        res.json({ message: 'Scraping successful', articles: articles });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /articles endpoint
app.get('/articles', (req, res) => {
    res.json(articles);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
