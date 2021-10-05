import './mock'
import axios from "axios";

//it is a function
async function print() {
	console.log('hello world');
	// const res = await axios.get('./index.js')
	// console.log(res)

	const res =await fetch('http://47.103.211.10:9090/static/images/girl.jpg')
	console.log(res)
}

//call it
print()
