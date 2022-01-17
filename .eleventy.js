const sass = require("sass");
const path = require("node:path");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return
      }
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes]
      });
      return async (data) => {
        return result.css;
      };
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};
