module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".json"],
      modules: [path.resolve("./src"), path.resolve("./node_modules")]
    }
  };
};
