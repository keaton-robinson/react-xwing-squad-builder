const webpack = require('webpack');

const config = require('./webpack.base_config.js'); 

// plugins may not work with devtool option in config

config.plugins.push(new webpack.DefinePlugin({
	XWING_API_ENDPOINT: JSON.stringify('http://localhost:3000')
}));

module.exports = config;
