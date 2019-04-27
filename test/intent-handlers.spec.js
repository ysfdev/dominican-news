'use strict';

const expect = require('chai').expect;
const intentHandlers = require('../lib/intent-handlers');
const mockIntentCtx = require('./fixtures/mock-intent-context');
const mockNewsScraper = require('./fixtures/mock-news-scaper');
const config = require('../config');

describe('Intents Handlers', () => {
  describe('when invoking launch request intent', () => {
    it('should emit get news headline event', (done) => {
      const newsScraper = mockNewsScraper.buildGetNews();
      const { LaunchRequest } =  intentHandlers.buildHandlers({ config, newsScraper });

      mockIntentCtx.callFnWithEmitter(LaunchRequest, 'GetNewsHeadLinesIntent', (err, result) => {
        expect(result).to.be.undefined;
        done();
      })
    })
  })

  describe('when invoking get news head lines intent', () => {
    it('should emit string of top headlines', (done) => {
      const expectedHeadlines = "news headlines, test healine 2";
      const expectedSpeechOut = config.GET_NEWS_MESSAGE + expectedHeadlines + config.END_NEWS_MESSAGE;
      const newsScraper = mockNewsScraper.buildGetNews(expectedHeadlines);

      const { GetNewsHeadLinesIntent } =  intentHandlers.buildHandlers({ config, newsScraper });
      mockIntentCtx.callFnWithEmitter(GetNewsHeadLinesIntent, ':tell', (speechOut, skillName, headlines) => {
        expect(speechOut).to.equal(expectedSpeechOut);
        expect(skillName).to.equal(skillName);
        expect(headlines).to.equal(expectedHeadlines);
        done();
      })
    })
  })

  describe('when invoking default Help Intent', () => {
    it('should emit string of help and reprompt message', (done) => {
      const newsScraper = mockNewsScraper.buildGetNews();

      const handlers =  intentHandlers.buildHandlers({ config, newsScraper });
      mockIntentCtx.callFnWithEmitter(handlers["AMAZON.HelpIntent"], ':ask', (speechOut, reprompt) => {
        expect(speechOut).to.equal(config.HELP_MESSAGE);
        expect(reprompt).to.equal(config.HELP_REPROMPT);
        done();
      })
    })
  })

  describe('when invoking cancel Intent', () => {
    it('should emit string with stop message', (done) => {
      const newsScraper = mockNewsScraper.buildGetNews();

      const handlers =  intentHandlers.buildHandlers({ config, newsScraper });
      mockIntentCtx.callFnWithEmitter(handlers["AMAZON.CancelIntent"], ':tell', (speechOut) => {
        expect(speechOut).to.equal(config.STOP_MESSAGE);
        done();
      })
    })
  })

  describe('when invoking stop Intent', () => {
    it('should emit string with stop message', (done) => {
      const newsScraper = mockNewsScraper.buildGetNews();

      const handlers =  intentHandlers.buildHandlers({ config, newsScraper });
      mockIntentCtx.callFnWithEmitter(handlers["AMAZON.StopIntent"], ':tell', (speechOut) => {
        expect(speechOut).to.equal(config.STOP_MESSAGE);
        done();
      })
    })
  })
})