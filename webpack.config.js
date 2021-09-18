const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const chalk = require('chalk');



const handler = (percentage, message, ...args) => {

};

module.exports = {
	entry: {
		"utils":"./src/utils.ts"
	},
	output: {
		filename: '[name].js',
		library: 'Utils',
		libraryTarget: "umd",
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
	mode: 'production',
	devServer: {
		compress: true,
		port: 9000,
		client: {
			progress: true,
		},
	},
	plugins: [
		new ProgressPlugin({
			activeModules: false,
			entries: true,
			handler(percentage, message, ...args) {
				handler(percentage, message, ...args)
			},
			modules: true,
			modulesCount: 5000,
			profile: false,
			dependencies: true,
			dependenciesCount: 10000,
			percentBy: null,
		}),
		// new HtmlWebpackPlugin({
		// 	title: 'ReactApp',
		// 	template: "./src/index.html"
		// 		}),
			new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js','jsx' ]
	},
};
