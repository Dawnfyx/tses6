/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const toolkit = __webpack_require__(1);
	
	const matrix = toolkit.makeMatrix();
	
	console.log(matrix);
	console.log("**************************************************");
	//九宫格 测试代码
	// const a = toolkit.makeMatrix();
	// a[0][1] = 2;
	// console.log(a);
	
	//洗牌算法 测试代码
	const  a = Array.from({ length: 9}, (v, i) => i);
	console.log(a);
	console.log(toolkit.shuffle(a));
	
	


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	const matrixToolkit = {
	
	
	    makeRow( v = 0){
	        const array = new Array(9);
	        array.fill(v);
	        return array;
	    },
	
	    makeMatrix( v = 0 ){
	        // const array = new Array(9);
	        // array.fill(makeRow(v));
	        // return array;
	        return Array.from({ length: 9}).map( () => this.makeRow(v));
	    },
	
	    //Fisher-Yates 洗牌算法
	    shuffle(array) {
	        const endIndex = array.length - 2;
	        for(let i = 0; i <= endIndex; i++){
	            const j = i + Math.floor(Math.random() * (array.length - i));
	            [array[i], array[j]] = [array[j], array[i]];
	        }
	        return array;
	    }
	
	};
	
	module.exports = matrixToolkit;


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map