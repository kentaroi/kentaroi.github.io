const sass = require("sass");
const path = require("node:path");
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
    return (date.getMonth() + 1).toString();
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};
