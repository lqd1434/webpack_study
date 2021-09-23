const { appSrcPath, htmlPath} = require('./configPath')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const loader = require("ts-loader");
const {ESBuildPlugin} = require("esbuild-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

module.exports={
	cache:{
		type:"filesystem"
	},
	entry:{
		index:path.resolve(appSrcPath,'index.tsx')
	},
	plugins: [
			new HtmlWebpackPlugin({
				title: "Webpack App",
				template: htmlPath,
				cache:true
			}),
		new ESBuildPlugin(),
		new BundleAnalyzerPlugin(),
		new ProgressBarPlugin({
			format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
		}),
		new MiniCssExtractPlugin({
			filename:"[name].css"
		}),
		new PurgeCSSPlugin({
			paths:glob.sync(`${appSrcPath}/*`,{nodir:true})
		}),
		new CleanWebpackPlugin(),
	],
	resolve: {
		extensions: [".tsx",".ts",".jsx",".js"],
		alias:{
			"@":appSrcPath
		}
	},
	module: {
		rules: [
			{
				test: /.(png|jpg|svg|jpeg|gif)$/,
				include: appSrcPath,
				type: "asset/resource"
			},
			{
				test: /\.(woff|woff2|ttf|eot|otf)$/,
				include: appSrcPath,
				type: "asset/resource"
			},
			// {
			// 	test:/\.(scss|sass)$/,
			// 	include: appSrcPath,
			// 	use: [
			// 		//将js字符串生成style节点
			// 		"style-loader",
			// 		//将css转化为commonjs模块
			// 		"css-loader",
			// 		//将scss编译为css
			// 		"sass-loader"
			// 	]
			// },
				//cssModule配置
			{
				test: /\.module\.(scss|sass)$/,
				include: appSrcPath,
				use:[
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules:true,
							importLoaders:2,
							//0 => no loader,
							//1 => postcss-loader,
							//2=> postcss-loader,sass-loader
						}
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions:{
								plugins: [
									[
											"postcss-preset-env"
									]
								],
							}
						}
					},
						//在非常耗时的loader前引入
					{
						loader: "thread-loader",
						options: {
							workerParallelJobs:2
						}
					},
					//将scss编译为css
					"sass-loader"
				]
			},
			{
				test: /\.(tsx|ts|jsx|js)$/,
				include: appSrcPath,
				use: [
					{
						loader: "esbuild-loader",
						options: {
							loader: "tsx",
							target:"es2015"
						}
					}
				]
			}
		]
	}
}
