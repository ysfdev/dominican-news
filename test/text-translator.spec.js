'use strict';

const textTranslator = require('../lib/text-translator');

//TODO: Mock side effects
describe.skip('Text Translator', function() {
    it('Should translate text to English', function(done) {
        textTranslator.translateToEnglish(["Hola Mundo", "Yo amo programacion"])
        .then(translation => {
            console.log('Text transalted', translation);
            done();
        })
        .catch(err => {
            console.error('Unable to translate text', err);
            done(err);
        })
    })
})