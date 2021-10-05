import React from "react";
import styles from "./index.module.scss"

const App = ()=>{
	const arr = ['1','2',333]
	console.log(arr)
	for (const arrKey in arr) {
		console.log(arr[arrKey])
	}
	return (
			<>
				<div className={styles.app}>App</div>
				<div>hhhh11111111111111hhhh11hhhh</div>
				<div>hhhh11111111111111hhhh11hhhh</div>
			</>
	)
}

export default App
