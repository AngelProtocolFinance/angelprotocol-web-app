const nodelib = require("node-stdlib-browser");
const { ProvidePlugin } = require("webpack");
const {
  NodeProtocolUrlPlugin,
} = require("node-stdlib-browser/helpers/webpack/plugin");
const { composePlugins, withNx } = require("@nrwl/webpack");
const { withReact } = require("@nrwl/react");

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config, context) => {
  const isProd = context.configuration === "production";

  config.stats = "errors-warnings";
  if (isProd) {
    config.plugins.push(new SizePlugin({ writeFile: false }));
  }

  config.resolve.alias = nodelib;

  config.plugins.push(new NodeProtocolUrlPlugin());
  config.plugins.push(
    new ProvidePlugin({
      process: nodelib.process,
      Buffer: [nodelib.buffer, "Buffer"],
    })
  );

  return config;
});
