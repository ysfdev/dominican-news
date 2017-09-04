'use strict';

const newsScraper = require('../lib/news-scraper');

describe('News Scraper', function() {
    it('Should retrieve top headlines from news pages', function(done) {
        newsScraper.getNewsHeadlines()
        .then(headlines => {
            console.log('Got top headlines', headlines);
            done();
        })
        .catch(err => {
            console.error('Unable to get headlines', err);
            done(err);
        })
    })
})