/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



function countKeys (obj) {
    // eslint-disable-next-line guard-for-in
    for (const key in obj) {
        if (typeof (obj[key]) === 'object') {
            keyCount += 1;
            countKeys(obj[key]);
        } else {
            keyCount += 1;
        }
    }
}

module.exports = {
    countKeys,
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const helpers = __webpack_require__(0);
//const _ = require('lodash');

/*
 Validates if JSON body string is a pretty printed JSON. It naively expects
 at least one line per key in parsed object.

 @targets: Request_Body, Response_Body
 @minim: true
 */
function validatePrettyPrintedJson(json) {
    _.each(json, function(a) {})
    let data;

    // eslint-disable-next-line no-param-reassign
    json = json.toValue();

    if ((json == null) || (json === '')) {
        return true;
    }

    try {
        data = JSON.parse(json);
    } catch (e) {
        return true;
    }

    if (typeof (data) !== 'object') {
        return true;
    }

    let keyCount = 0;

    helpers.countKeys(data);

    const linesCount = json.split('\n').length;

    if (linesCount >= keyCount) {
        return true;
    }
    return 'JSON is not pretty-printed, expecting one key per line.';
}


module.exports = {
    validatePrettyPrintedJson,
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function someFunction(data) {
    console.error('aaa');
    return 'error';
}
module.exports = {
    someFunction,
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

someFunction_webpack = __webpack_require__(2).someFunction;
validatePrettyPrintedJson_webpack = __webpack_require__(1).validatePrettyPrintedJson;
module.exports = {
someFunction_webpack,
validatePrettyPrintedJson_webpack,
};


/***/ })
/******/ ]);

function someFunction(data) {
    return someFunction_webpack(data);
}


function validatePrettyPrintedJson(data) {
    return validatePrettyPrintedJson_webpack(data);
}

module.exports = {
someFunction,
validatePrettyPrintedJson,
};


function someFunction(data) {
    return someFunction_webpack(data);
}
    

function validatePrettyPrintedJson(data) {
    return validatePrettyPrintedJson_webpack(data);
}
    
module.exports = {
someFunction,
validatePrettyPrintedJson,
};


function someFunction(data) {
    return someFunction_webpack(data);
}
    

function validatePrettyPrintedJson(data) {
    return validatePrettyPrintedJson_webpack(data);
}
    
module.exports = {
someFunction,
validatePrettyPrintedJson,
};


function someFunction(data) {
    return someFunction_webpack(data);
}
    

function validatePrettyPrintedJson(data) {
    return validatePrettyPrintedJson_webpack(data);
}
    
module.exports = {
someFunction,
validatePrettyPrintedJson,
};
