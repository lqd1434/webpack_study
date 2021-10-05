

if (window.XMLHttpRequest!==undefined){
	console.log(XMLHttpRequest.prototype)
	XMLHttpRequest.prototype.send=function (data){
		console.log('send',data)
	}
}
