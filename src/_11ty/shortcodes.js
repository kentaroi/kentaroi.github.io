const filters = require("./filters");
module.exports = {
  timeTagForYear: function(year) {
    let url = `/${ year }/`;
    return `<time class="year" datetime="${ year }"><a href="${ url }">${ year }</a></time>`;
  },
  timeTagForMonth: function(year, month, showYear = true) {
    let name = filters.monthIndexToName(month);
    let numericMonth = filters.monthIndexToNumeric(month);
    let datetime = `${ year }-${ numericMonth }`
    let url = `/${ year }/${ numericMonth }/`;
    let text = showYear ? name + ' ' + year.toString() : name;
    return `<time class="month" datetime="${ datetime }"><a href="${ url }">${ text }</a></time>`;
  },
  timeTagForDate: function(date, longOrShort = 'long') {
    let datetime = date.toISOString();
    let formattedDate = filters.formatDate(date, longOrShort);
    return `<time datetime="${ datetime }">${ formattedDate }</time>`;
  },
  tagList: function(tags) {
    let tagLinks = tags.map(tag => {
      let url = filters.tagNameToUrl(tag);
      return `<li><a href="${ url }" class="tag">${ tag }</a></li>`;
    }).join("\n");
    return '<ul class="tag-list">' + tagLinks + '</ul>';
  },
  tagCloud: function(weightedTags) {
    let listItems = weightedTags.map(tag => {
      let url = encodeURI("/tags/" + tag.name + "/");
      return `<li><a href="${ url }" class="tag" data-weight="${ tag.weight }">${ tag.name }</a></li>`;
    }).join("\n");
    return '<ul class="tag-cloud">' + listItems + '</ul>';
  }
}
