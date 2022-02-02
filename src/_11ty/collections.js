module.exports = {
  recent: function(collectionApi) {
    return collectionApi.getFilteredByTag("blog")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
  },
  years: function(collectionApi) {
    let m = collectionApi.getFilteredByTag("blog")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce((result, post) => {
        let year = post.date.getFullYear();
        let month = post.date.getMonth();
        if (result.has(year)) {
          let yearlyPosts = result.get(year);
          if (yearlyPosts.has(month)) {
            yearlyPosts.get(month).push(post);
          } else {
            yearlyPosts.set(month, [post]);
          }
        } else {
          let yearlyPosts = new Map();
          yearlyPosts.set(month, [post]);
          result.set(year, yearlyPosts);
        }
        return result;
      }, new Map());
    return [...m].map(function(item) {
      return {year: item[0], monthlyPosts: [...item[1]].map(function(item) {
        return {month: item[0], posts: item[1]};
      })};
    });
  },
  months: function(collectionApi) {
    return collectionApi.getFilteredByTag("blog")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce((result, post) => {
        let year = post.date.getFullYear();
        let month = post.date.getMonth();
        let last = result[result.length - 1];
        if (last && year == last.year && month == last.month) {
            last.posts.push(post);
        } else {
          result.push({year: year, month: month, posts: [post]});
        }
        return result;
      }, []);
  },
  tags: function(collectionApi) {
    const ignoreSet = new Set(["blog"]);
    let m = collectionApi.getFilteredByTag("blog")
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce((result, post) => {
        for (let tag of post.data.tags) {
          if (ignoreSet.has(tag)) {
            continue;
          }
          if (result.has(tag)) {
            result.get(tag).push(post);
          } else {
            result.set(tag, [post]);
          }
        }
        return result;
      }, new Map());
    return [...m].map(e => {
      return {name: e[0], posts: e[1]}
    });
  },
  countsByTag: function(collectionApi) {
    const ignoreSet = new Set(["all", "blog", "years", "months"]);
    let result = new Map();
    for (let post of collectionApi.getFilteredByTag("blog")) {
      for (let tag of post.data.tags) {
        if (ignoreSet.has(tag)) {
          continue;
        }
        if (result.has(tag)) {
          result.set(tag, result.get(tag) + 1);
        } else {
          result.set(tag, 1);
        }
      }
    }
    return result;
  },
  weightedTags: function(collectionApi) {
    let countsByTag = this.countsByTag(collectionApi);
    let size = countsByTag.size;
    let lastCount, lastWeight;
    let result = [...countsByTag].map(e => {
      return {name: e[0], count: e[1]};
    }).sort((a, b) => b.count - a.count)
      .map((e, index) => {
        if (e.count == lastCount) {
          e["weight"] = lastWeight;
        } else {
          let weight = 10 - Math.floor(index * 10 / size);
          e["weight"] = weight;
          lastCount = e.count;
          lastWeight = weight;
        }
        return e;
      }).sort((a, b) => a.name < b.name ? -1 : 1);
    return result;
  }
};
