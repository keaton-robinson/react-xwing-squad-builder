const webpack = require("webpack");

const config = require("./webpack.base_config.js");

// plugins may not work with devtool option in config

if (!process.env.XWING_API_ENDPOINT) {
  throw new Error(
    "XWING_API_ENDPOINT not set! This must be set for the backend to work.",
  );
}
config.plugins.push(
  new webpack.DefinePlugin({
    XWING_API_ENDPOINT: JSON.stringify(process.env.XWING_API_ENDPOINT),
  }),
);

module.exports = config;
