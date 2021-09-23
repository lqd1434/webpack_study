const { appSrcPath } = require('./configPath')
const path = require('path')

module.exports={
	entry:{
		index:path.resolve(appSrcPath,'index.js')
	},
}
