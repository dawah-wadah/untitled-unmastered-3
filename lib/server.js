/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_api_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);




const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

app.get('/foo', function(req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_0__util_api_util__["a" /* default */])();
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request_promise_native__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request_promise_native___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request_promise_native__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_es6_promise__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_es6_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_es6_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_location_js__ = __webpack_require__(5);





const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.com/${endpoint}`,
    header: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
};

const fetch = (item) => __WEBPACK_IMPORTED_MODULE_0_request_promise_native___default()(options(item));

const formatDrone = data => {
  let id = data.droneId;
  let currentLocation = new __WEBPACK_IMPORTED_MODULE_2__lib_location_js__["a" /* default */]({
    latitude: data.location.latitude,
    longitude: data.location.longitude} );
};

const getData = () => (
  fetch('packages').then(res => {
    console.log(res);
  })
);

/* harmony default export */ __webpack_exports__["a"] = (getData);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Location {
  constructor(options) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.distanceTo = this.distanceTo.bind(this);
    this.deg2rad = this.deg2rad.bind(this);
  }


  distanceTo(location){
    const radius = 6371;
    const dLat = this.deg2rad(location.latitude - this.latitude);
    const dLong = this.deg2rad(location.longitude - this.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.latitude)) *
      Math.cos(this.deg2rad(location.latitude)) *
      Math.sin(dLong/2) + Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (radius * c) / 1000;
  }

  etaTo(location, speed){
    return (this.distanceTo(location) / speed) * 3600; // in seconds
  }

  deg2rad(deg){
    return deg * (Math.PI/180);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Location);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map