const path = require('path');

module.exports = {	
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