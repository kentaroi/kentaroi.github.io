const sass = require("sass");
const path = require("node:path");
const collections = require("./src/_11ty/collections");
const filters     = require("./src/_11ty/filters");
const shortcodes  = require("./src/_11ty/shortcodes");

const DependencyGraph = require("dependency-graph").DepGraph;
let graph = new DependencyGraph();
let cacheKeys = new Map();

module.exports = function(eleventyConfig) {
  // Config for old contents
  eleventyConfig.addPassthroughCopy("src/articles/images");
  eleventyConfig.addNunjucksFilter("safeToDateString", function(date) {
    if (date instanceof Date) {
      return date.toDateString();
    } else {
      return "";
    }
  });

  // For debug
  eleventyConfig.addFilter("inspect", function(obj, desc) {
    desc ??= ''
    console.log("INSPECT %s: %O", desc, obj);
  });

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


  // Config for SCSS
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compileOptions: {
      cache: true,
      getCacheKey: function(contents, inputPath) {
        let key = cacheKeys.get(inputPath);
        if (key) {
          console.log(`getCacheKey(contents, ${ inputPath }) -> ${ key }`);
          return key;
        }
        let newKey = inputPath + (new Date().toISOString()) + 'new';
        cacheKeys.set(inputPath, newKey);
        console.log(`getCacheKey(contents, ${ inputPath }) -> ${ newKey }`);
        return newKey;
      }
    },
    compile: async function(inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return
      }
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes]
      });
      let dependant = "./" + path.normalize(inputPath);
      if (!graph.hasNode(dependant)) {
        graph.addNode(dependant);
      }
      let loadedPaths = result.loadedUrls.map(url => "./" + path.relative('.', url.pathname));
      let dependencies = graph.dependenciesOf(dependant);
      let dependenciesToBeRemoved = dependencies.filter(e => !loadedPaths.includes(e));
      let dependenciesToBeAdded = loadedPaths.filter(e => !dependencies.includes(e));
      for (let dependency of dependenciesToBeRemoved) {
        graph.removeDependency(dependant, dependency)
      }
      for (let dependency of dependenciesToBeAdded) {
        if (!graph.hasNode(dependency)) {
          graph.addNode(dependency);
        }
        graph.addDependency(dependant, dependency)
      }
      return async (data) => {
        return result.css;
      };
    }
  });

  eleventyConfig.on("eleventy.beforeWatch", function(queue) {
    let key = new Date().toISOString();
    for (let path of queue) {
      cacheKeys.set(path, path + key);
      if (!graph.hasNode(path)) {
        continue;
      }
      let dependants = graph.dependantsOf(path);
      for (let dependant of dependants) {
        cacheKeys.set(dependant, dependant + key);
      }
    }
  });

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
