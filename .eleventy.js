const Image = require("@11ty/eleventy-img");
const fg = require("fast-glob");

const artImages = fg.sync("./art");

const imageShortcode = async (
  src,
  alt,
  _widths,
  sizes
  // className = undefined,
  // widths = [400, 800, 1280],
  // formats = ['webp', 'jpeg'],
  // sizes = '100vw'
) => {
  const widths = JSON.parse(_widths);
  let metadata = await Image(src, {
    widths,
    formats: ["webp", "jpg"],
    outputDir: "./_site/img/",
  });

  let attributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, attributes);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./static");
  eleventyConfig.addShortcode("image", imageShortcode);
  // eleventyConfig.addCollection("artImages", artImages);
};
