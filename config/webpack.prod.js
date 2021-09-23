const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const {appDistPath} = require("./configPath");

//生产环境配置
module.exports = merge(common,{
	mode:'production',
	output:{
		filename:'[name].[contenthash].build.js',
		path:appDistPath,
		clean:true
	}
})
