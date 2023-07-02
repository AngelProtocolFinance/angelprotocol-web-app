const { ProvidePlugin } = require("webpack");
const nodelib = require("node-stdlib-browser");
const {
  NodeProtocolUrlPlugin,
} = require("node-stdlib-browser/helpers/webpack/plugin");

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
  config.resolve.fallback = nodelib;
  config.plugins.push(new NodeProtocolUrlPlugin());
  config.plugins.push(
    new ProvidePlugin({
      process: nodelib.process,
      Buffer: [nodelib.buffer, "Buffer"],
    })
  );

  return config;
};
