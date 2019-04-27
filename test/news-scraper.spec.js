'use strict';

const newsScraper = require('../lib/news-scraper');
const expect = require('chai').expect;

describe('News Scraper', () => {
    describe('when getting news', () => {
        it('Should retrieve top news from source pages based on the given topic name', () => {
            return newsScraper.getNews('headlines').then(pageContent => {
                expect(pageContent).to.be.not.undefined;
                expect(pageContent).to.be.an('string');
            })
        })

        it('Should return invalid-topic error, if provided topic name is not valid', () => {
            return newsScraper.getNews('ramdomtopicname')
            .catch(err => {
                expect(err.name).to.equal('invalid-topic');
            })
        })
    })
})