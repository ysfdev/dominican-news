'use strict';

const scrapeIt = require("scrape-it");
const textTranslator = require('./text-translator');
const Promise = require('bluebird');
const DR_NEWS_SOURCES = require('./news-sources.json')

/**
 * Retrieve the top News from D.R news sources
 */
exports.getNews = (topicName) => {
    //Default to first source, but we may allow the user to select other sources or 
    //fallback to others in case first source returns no content or it's offline.
    const source = DR_NEWS_SOURCES[0]; 
    if (!source.topics[topicName]) {
        let err = new Error();
        err.name = "invalid-topic";
        err.message = `The provided topic name '${topicName}' was not found in the available topics for this source`;
        return Promise.reject(err);
    }
    let url = source.url;
    if (topicName !== "headlines" && source.topicsEndpoint) {
        url += source.topicsEndpoint + topicName;
    }
    return scrapeIt(source.url, source.topics[topicName]).then(page => {
        if (!page) return [];
        
        const pageContent = [page.main, ...page.content];
        
        return (source.translate) 
            ? textTranslator.translateToEnglish(pageContent)
            : parseNewsContent(pageContent);
    });
};

function parseNewsContent(content) {
    return content.join(".<break time='1s'/>");
}