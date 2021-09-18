export const deepClone = (sourceObj:any)=>{
	if (typeof sourceObj !== "object") return sourceObj;
	let targetObj:any = (sourceObj instanceof Array) ? []:{}
	for (const key in sourceObj) {
		if (sourceObj.hasOwnProperty(key)){
			if (!(key in targetObj)){
				if (sourceObj[key] instanceof Date){
					targetObj[key] =new Date((sourceObj[key] as Date).getTime())
				} else if (sourceObj[key] instanceof RegExp){
					targetObj[key] =new RegExp(sourceObj[key])
				} else if (typeof sourceObj[key] === "object"&&(sourceObj[key] as Element).nodeType===1){
					targetObj[key] = (sourceObj[key] as Element).cloneNode(true)
				} else {
					targetObj[key] = (typeof sourceObj[key] === 'object') ? deepClone(sourceObj[key]):sourceObj[key]
				}
			}
		}
	}
	return targetObj
}
