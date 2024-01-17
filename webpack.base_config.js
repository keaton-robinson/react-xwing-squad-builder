const path = require('path');

module.exports = {	
	entry: './src/reactEntryPoint.tsx',
	output : {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'  //this is the default value, but setting it explicitly as a reminder
	},
	plugins: [],
	module: {
		rules: [
			// use ts-loader to transpile typescript and JSX to javascript
		  { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
	
		  // adds source-map support
		  { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
		]
	  },
	  resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	},
	  devtool: "source-map"
};