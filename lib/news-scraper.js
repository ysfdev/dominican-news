'use strict';

const scrapeIt = require("scrape-it");
const textTranslator = require('./text-translator');
const DR_NEWS_SOURCES = ['http://eldia.com.do/nacionales'];

/**
 * Retrieve the top headlines from D.R news sources
 */
exports.getNewsHeadlines = () => {
    return scrapeIt(DR_NEWS_SOURCES[0], {
       mainHeadline: ".main-news-gallery-item-caption-wrapper > h2 > a",
       headlines: {
            listItem: ".main-article-content > a > h2"
        }
    }).then(page => {
        const allHeadlines = [page.mainHeadline, ...page.headlines];
        return textTranslator.translateToEnglish(allHeadlines);
    });
};
