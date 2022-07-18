var webpack = require('webpack');
const path = require('path');

var config = {	
	entry: './src/reactEntryPoint.js',
	output : {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'  //this is the default value, but setting it explicitly as a reminder
	},
	plugins: [],
	module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  };

module.exports = (env, argv) => {
	let apiHost;
	switch(argv.mode) {
		case "development":
			apiHost = "'http://localhost:3000'";
			break;
		case "production":
			apiHost = "'dummy value until I get backend deployed to heroku'";
			break;
		default:
			throw new Error("You must specify development or production for webpack build --mode"); 
				
	}
	config.plugins.push(new webpack.DefinePlugin({
		__API__: apiHost
	}));	

	return config;
}
