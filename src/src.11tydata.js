function isProduction() {
  let env = process.env.ELEVENTY_ENV;
  if (env == undefined) {
    return true;
  }
  return 'production'.startsWith(env.toLowerCase());
}

function isFuture(data) {
  return data.page.date.getTime() > Date.now();
}

module.exports = {
  eleventyComputed: {
    permalink(data) {
      if (!isProduction()) {
        return data.permalink;
      }
      if (data.draft || isFuture(data)) {
        return false;
      }
      return data.permalink;
    },
    eleventyExcludeFromCollections(data) {
      if (!isProduction()) {
        return data.eleventyExcludeFromCollections;
      }
      if (data.draft || isFuture(data) || data.permalink == false) {
        return true;
      }
      return data.eleventyExcludeFromCollections;
    }
  }
};
