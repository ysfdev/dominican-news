'use strict';

const newsScraper = require('../lib/news-scraper');
const expect = require('chai').expect;

describe('News Scraper -> getNews', function() {
    it('Should retrieve top news from source pages based on the given topic name', function(done) {
        newsScraper.getNews('headlines')
        .then(pageContent => {
            console.log('Got top news', pageContent);
            done();
        })
        .catch(err => {
            console.error('Unable to get news', err);
            done(err);
        })
    })

    it('Should return invalid-topic error, if provided topic name is not valid', function(done) {
        newsScraper.getNews('ramdomtopicname')
        .catch(err => {
            expect(err.name).to.equal('invalid-topic');
            done();
        })
    })
})