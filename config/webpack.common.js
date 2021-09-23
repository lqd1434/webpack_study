const { appSrcPath, htmlPath} = require('./configPath')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const loader = require("ts-loader");

module.exports={
	entry:{
		index:path.resolve(appSrcPath,'index.tsx')
	},
	plugins: [
			new HtmlWebpackPlugin({
				title: "Webpack App",
				template: htmlPath,
				cache:true
			})
	],
	resolve: {
		extensions: [".tsx",".ts",".jsx",".js"]
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
