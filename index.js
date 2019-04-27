'use strict';

const Alexa = require('alexa-sdk');
const newsScraper = require('./lib/news-scraper');
const { buildHandlers } = require('./lib/intent-handlers')
const config = require('./config');

const APP_ID = config.AVS_APP_ID;

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(buildHandlers({ config, newsScraper }));
    alexa.execute();
};