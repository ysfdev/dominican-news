'use strict';

const Promise = require('bluebird');
const config = require('../config');
const googleTranslate = require("google-translate")(config.google.key);

/**
 * Transalate given string/s to English
 */
exports.translateToEnglish = (strings) => {
    return new Promise((resolve, reject) => {
        googleTranslate.translate(strings, 'en', function(err, translation) {
            if (err) reject(err);
            resolve(parseTranslatedStrings(translation));
          });
    })
};

/**
 * Parses and return a String of the translated string texts 
 * @param {Array} translatedStrings 
 */
const parseTranslatedStrings = (translatedStrings) => {
    return translatedStrings.map(function(string) {
        return string.translatedText;
    }).join(".<break time='1s'/>");
};

