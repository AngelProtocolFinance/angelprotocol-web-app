const { ProvidePlugin } = require("webpack");

module.exports = function override(config, env) {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
  ];
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    path: require.resolve("path-browserify"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    os: require.resolve("os-browserify/browser"),
    assert: require.resolve("assert/"),
  };
  config.plugins.push(
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  return config;
};
