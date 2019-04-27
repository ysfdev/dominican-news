
exports.buildHandlers = ({ config, newsScraper }) => {
  return {
    LaunchRequest() {
      //TODO: Prompt user for what type new topic they will like to retrieve
      this.emit('GetNewsHeadLinesIntent');
    },

    GetNewsHeadLinesIntent() {
      return newsScraper.getNews('headlines')
      .then(newsHeadlines => {
        const speechOutput = config.GET_NEWS_MESSAGE + newsHeadlines + config.END_NEWS_MESSAGE;
        this.emit(':tell', speechOutput, config.SKILL_NAME, newsHeadlines);
        return speechOutput;
      })
      .catch(err => {
        this.emit(':tell', config.ERROR_MESSAGE, config.SKILL_NAME);
        return err;
      })
    },

    ['AMAZON.HelpIntent']() {
      const speechOutput = config.HELP_MESSAGE;
      const reprompt = config.HELP_REPROMPT;
      this.emit(':ask', speechOutput, reprompt);
    },

    ['AMAZON.CancelIntent']() {
      this.emit(':tell', config.STOP_MESSAGE);
    },

    ['AMAZON.StopIntent']() {
      this.emit(':tell', config.STOP_MESSAGE);
    }
  };
};
