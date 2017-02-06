var path = require('path');

var ExtractPlugin = require('extract-text-webpack-plugin');

var PATH_ENTRY = path.resolve(__dirname, 'docs', 'webpack-entry.scss');
var PATH_BUNDLE_DEST = path.resolve(__dirname, 'docs', 'templates', 'assets');

module.exports = {
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractPlugin.extract("css!sass")
			}
		]
	},

	plugins: [
		new ExtractPlugin("swarm-sasstools.css")
	],

	// webpack requires a js entry point
	// and bundle location
	entry: {
		sasstools: [PATH_ENTRY]
	},
	output: {
		path: PATH_BUNDLE_DEST,
		filename: 'bundle.js'
	}
};
