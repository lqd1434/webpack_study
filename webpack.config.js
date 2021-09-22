const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {ESBuildPlugin} = require('esbuild-loader')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin')


module.exports = smp.wrap({
	entry: "./lib/index.tsx",
	output: {
		filename: 'bundle.js',
		pathinfo: false,
		// libraryTarget: "umd",
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'eval-cheap-module-source-map',
	mode: 'development',
	devServer: {
		compress: true,
		port: 9000,
		client: {
			progress: true,
		},
	},
	cache: {
		type: 'filesystem', // 使用文件缓存
	},
	externals:{
		"react":'React',
		"react-dom":"ReactDOM"
	},
	plugins: [
		new HtmlWebpackPlugin({template: "./lib/index.html"}),
		new ESBuildPlugin(),
			new BundleAnalyzerPlugin(),
		new ProgressBarPlugin({
			format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'esbuild-loader',
				// exclude: /node_modules/,
				include:path.resolve(__dirname, 'lib'),
				options: {
					loader:"tsx",
					target:"es2015"
				}
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js','jsx' ]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: 4,
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
			}),
		],
		splitChunks: {
			// include all types of chunks
			chunks: 'all',
			// 重复打包问题
			cacheGroups:{
				vendors:{ // node_modules里的代码
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					// name: 'vendors', 一定不要定义固定的name
					priority: 10, // 优先级
					enforce: true
				}
			}
		},
	}
});
