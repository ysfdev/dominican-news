'use strict';

const config = module.exports;

config.google = {
    key: process.env.GOOGLE_TRANSLATE_KEY
};

config.AVS_APP_ID = process.env.AVS_APP_ID;  

config.SKILL_NAME = "Dominican News";
config.GET_NEWS_MESSAGE = "Welcome to Dominican News, Here are the latest dominican news: ";
config.END_NEWS_MESSAGE = ".<break time='1s'/> Thanks for staying in synced with Dominican News. Goodbye!"
config.HELP_MESSAGE = "You can say tell me dominican news or, you can say exit... What can I help you with?";
config.HELP_REPROMPT = "What can I help you with?";
config.STOP_MESSAGE = "Goodbye!";
config.ERROR_MESSAGE = "Opss! We had a problem getting the top news. Please try again";