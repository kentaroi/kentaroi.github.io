const filters = require("./filters");
module.exports = {
  linkToPost: function(post, classes="main__link") { // supposed to be used in main column
    return `<a class="${ classes }" href="${ post.url }">${ post.data.title }</a>`;
  },
  timeTagForYear: function(year, klass = null) {
    let classes = (klass ? klass + " " : "") + "year";
    let url = `/${ year }/`;
    return `<time class="${ classes }" datetime="${ year }"><a class="year__link" href="${ url }">${ year }</a></time>`;
  },
  timeTagForMonth: function(year, month, showYear = true, klass = null) {
    let classes = (klass ? klass + " " : "") + "month";
    let name = filters.monthIndexToName(month);
    let numericMonth = filters.monthIndexToNumeric(month);
    let datetime = `${ year }-${ numericMonth }`
    let url = `/${ year }/${ numericMonth }/`;
    let text = showYear ? name + " " + year.toString() : name;
    return `<time class="${ classes }" datetime="${ datetime }"><a class="month__link" href="${ url }">${ text }</a></time>`;
  },
  timeTagForDate: function(date, longOrShort, klass = null) {
    let classes = (klass ? klass + " " : "") + "date";
    let datetime = date.toISOString();
    let formattedDate = filters.formatDate(date, longOrShort);
    return `<time class="${ classes }" datetime="${ datetime }">${ formattedDate }</time>`;
  },
  tagList: function(tags, klass = null) {
    let classes = (klass ? klass + " " : "") + "tag-list";
    let tagLinks = tags.map(tag => {
      let url = filters.tagNameToUrl(tag);
      return `<li class="tag-list__tag tag"><a href="${ url }" class="tag__link">${ tag }</a></li>`;
    }).join("\n");
    return `<ul class="${ classes }">${ tagLinks }</ul>`;
  },
  tagCloud: function(weightedTags) {
    let listItems = weightedTags.map(tag => {
      let url = encodeURI("/tags/" + tag.name + "/");
      return `<li class="tag-cloud__tag tag"><a href="${ url }" class="tag__link" data-weight="${ tag.weight }">${ tag.name }</a></li>`;
    }).join("\n");
    return '<ul class="tag-cloud">' + listItems + '</ul>';
  }
};
