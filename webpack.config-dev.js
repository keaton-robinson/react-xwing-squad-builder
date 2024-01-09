import webpack from 'webpack'
 
import config from './webpack.base_config.js';

config.plugins.push(new webpack.DefinePlugin({
	XWING_API_ENDPOINT: JSON.stringify('http://localhost:3000')
}));

export default config 