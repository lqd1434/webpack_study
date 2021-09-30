const {appSrcPath} = require("./configPath");
const path = require('path')
module.exports = {
	mode: "none",
	entry: path.resolve(appSrcPath,'test/index.js'),
	output: {
		path: path.resolve(__dirname,'build')
	},
	resolveLoader: {
		// loader查找路径，默认是node_modules,所以我们平常写loader（如babel-loader）时实际都会去node_modules里找
		modules: ["node_modules", path.resolve(appSrcPath, "loaders")], // 增加查找路径。顺序是从前往后
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: "myLoader",
				options:{
					oneLine: true, // 是否删除单行注释
					multiline: true, // 是否删除多行注释
				}
			}
		]
	}
}
