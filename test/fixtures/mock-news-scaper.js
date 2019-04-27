exports.buildGetNews = (expectedData, throwError) => ({ 
  getNews: () => (throwError) ? Promise.reject(throwError) : Promise.resolve(expectedData)
});