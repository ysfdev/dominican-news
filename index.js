'use strict';

const Alexa = require('alexa-sdk');
const newsScraper = require('./lib/news-scraper');

const APP_ID = "amzn1.ask.skill.661b5b23-0ed2-49e6-8d05-23505041fe1f";

const SKILL_NAME = "Dominican News";
const GET_NEWS_MESSAGE = "Welcome to Dominican News, Here are the latest dominican news: ";
const END_NEWS_MESSAGE = ".<break time='1s'/> Thanks for staying in synced with Dominican News. Goodbye!"
const HELP_MESSAGE = "You can say tell me dominican news or, you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";
const ERROR_MESSAGE = "Opss! We had a problem getting the top news. Please try again";

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewsHeadLinesIntent');
    },
    'GetNewsHeadLinesIntent': function () {
        newsScraper.getNewsHeadlines()
        .then(newsHeadlines => {
            const speechOutput = GET_NEWS_MESSAGE + newsHeadlines + END_NEWS_MESSAGE;
            this.emit(':tellWithCard', speechOutput, SKILL_NAME, newsHeadlines)
        })
        .catch(err => {
            this.emit(':tellWithCard', ERROR_MESSAGE, SKILL_NAME)
        })
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};