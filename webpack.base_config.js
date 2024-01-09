import path from 'path';

import * as url from 'url';
//const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {	
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