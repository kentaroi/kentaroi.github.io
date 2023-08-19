const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const path = require("path");
const sass = require("eleventy-sass");
const collections = require("./src/_11ty/collections");
const filters     = require("./src/_11ty/filters");
const shortcodes  = require("./src/_11ty/shortcodes");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(sass);

  // Config for old contents
  eleventyConfig.addPassthroughCopy("src/articles/images");
  eleventyConfig.addNunjucksFilter("safeToDateString", function(date) {
    if (date instanceof Date) {
      return date.toDateString();
    } else {
      return "";
    }
  });
  eleventyConfig.addPassthroughCopy("src/products/twlikes/info-for-twlikes.json");
  eleventyConfig.addPassthroughCopy("src/en/products/twlikes/info-for-twlikes.json");

  // For debug
  eleventyConfig.addFilter("inspect", function(obj, desc) {
    desc ??= ''
    console.log("INSPECT %s: %O", desc, obj);
  });


  // Markdown
  let md = require("markdown-it")({
    html: true
  }) // This is 11ty's default option
    .use(require('markdown-it-bracketed-spans'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-footnote'));

  // Add class="main__link" attribute to links which do not have
  // class attribute.
  // This fix is applied for markdown files whose layouts are
  // layout.njk or blog-layout.njk.
  let defaultRenderer = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    if (!["layout.njk", "blog-layout.njk"].includes(env["layout"])) {
      return defaultRenderer(tokens, idx, options, env, self);
    }
    let aIndex = tokens[idx].attrIndex("class");
    if (aIndex < 0) {
      tokens[idx].attrPush(["class", "main__link"]);
    }
    return defaultRenderer(tokens, idx, options, env, self);
  };

  // Add class="main__inline-code" attribute to code tag which do not have
  // class attribute.
  let defaultCodeInline = md.renderer.rules.code_inline;
  md.renderer.rules.code_inline = function(tokens, idx, options, env, self) {
    if (!["layout.njk", "blog-layout.njk"].includes(env["layout"])) {
      return defaultCodeInline(tokens, idx, options, env, self);
    }
    let aIndex = tokens[idx].attrIndex("class");
    if (aIndex < 0) {
      tokens[idx].attrPush(["class", "main__inline-code"]);
    }
    return defaultCodeInline(tokens, idx, options, env, self);
  };
  eleventyConfig.setLibrary("md", md);


  // Config for CSS
  eleventyConfig.addPassthroughCopy("src/css/*.css");


  // Custom collections, filters, and shortcodes
  for (let name in collections) {
    eleventyConfig.addCollection(name, collections[name]);
  }

  for (let name in filters) {
    eleventyConfig.addNunjucksFilter(name, filters[name]);
  }

  for (let name in shortcodes) {
    eleventyConfig.addNunjucksShortcode(name, shortcodes[name]);
  }


  eleventyConfig.addFilter("year", function(date) {
    return date.getFullYear().toString();
  });
  eleventyConfig.addFilter("month", function(date) {
    return (date.getMonth() + 1).toString().padStart(2, '0');
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist"
    }
  }
};
