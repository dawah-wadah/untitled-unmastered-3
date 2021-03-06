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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_dispatcher_js__ = __webpack_require__(11);






const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

app.get('', __WEBPACK_IMPORTED_MODULE_2_cors___default()(), function(req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_0__util_api_util__["a" /* default */])()
  .then( items => res.send(Object(__WEBPACK_IMPORTED_MODULE_3__util_dispatcher_js__["a" /* default */])(items)))
  .catch(() => res.send('Cannot GET data'));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_drone_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_package_js__ = __webpack_require__(10);







const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.co/${endpoint}`,
    headers: {
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
  let homeLocation = new __WEBPACK_IMPORTED_MODULE_2__lib_location_js__["a" /* default */]({
    latitude: -37.816656,
    longitude: 144.964212
  });
  let packages = formatPackages(data.packages);
  let speed = 50;
  return new __WEBPACK_IMPORTED_MODULE_3__lib_drone_js__["a" /* default */]({
    id, currentLocation, homeLocation, packages, speed
  });
};
const formatPackage = data => {
  let id = data.packageId;
  let destination = new __WEBPACK_IMPORTED_MODULE_2__lib_location_js__["a" /* default */]({
    latitude: data.destination.latitude,
    longitude: data.destination.longitude} );
  let pickupLocation = new __WEBPACK_IMPORTED_MODULE_2__lib_location_js__["a" /* default */]({
    latitude: -37.816656,
    longitude: 144.964212
  });
  let deadline = data.deadline;
  return new __WEBPACK_IMPORTED_MODULE_4__lib_package_js__["a" /* default */]({
    id, pickupLocation, destination, deadline
  });
};

const formatDrones = droneData => (
  droneData.map(drone => formatDrone(drone))
);
const formatPackages = packageData => (
  packageData.map(foo => formatPackage(foo))
);

const getData = () => (
  __WEBPACK_IMPORTED_MODULE_1_es6_promise___default.a.all([fetch('drones'), fetch('packages')]).then(res => {
    let drones = formatDrones(res[0]);
    let packages = formatPackages(res[1]);
    return {drones, packages};
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
  }


  distanceTo(location) {
    const radius = 6371e3;
    const lat1 = this.deg2rad(this.latitude);
    const lat2 = this.deg2rad(location.latitude);
    const dLat = this.deg2rad(location.latitude - this.latitude);
    const dLong = this.deg2rad(location.longitude - this.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (radius * c) / 1000;
  }

  etaTo(location, speed) {
    var time = (this.distanceTo(location) / speed) * 3600; // in seconds
    return time;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Location);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Drone {
  constructor(options) {
    this.id = options.id;
    this.homeLocation = options.homeLocation;
    this.currentLocation = options.currentLocation;
    this.packages = options.packages;
    this.speed = options.speed;
    this.availableWhen = this.availableWhen.bind(this);
  }

  etaHome(){
    return this.currentLocation.etaTo(this.homeLocation, this.speed);
  }

  anyPackages() {
    return Boolean(this.packages.length);
  }

  undeliverable(parcel){
    const timeNow = new Date().getTime() / 1000 | 0;
    return (parcel.deadline - this.availableWhen()) < timeNow;
  }

  deliveryTime(){
    var speed = 50;
    return this.packages.reduce(
      (time, parcel) => {
        const timeToDestination =
          this.currentLocation
          .etaTo(parcel.destination, speed);
        const timeToHome = parcel.destination.etaTo(this.homeLocation, speed);
        this.currentLocation = this.homeLocation;
        return time + timeToDestination + timeToHome;
      }, 0
    );
  }

  availableWhen(){
    return this.anyPackages() ? this.deliveryTime() : this.etaHome();
  }

}

Drone.prototype.compareTimeTillAvailable = function(droneA, droneB){
    return droneA.availableWhen() - droneB.availableWhen();
  };

Drone.prototype.soonestDrones = function(drones){
  return drones.sort((a,b) => (a.availableWhen() - b.availableWhen()));
};

/* harmony default export */ __webpack_exports__["a"] = (Drone);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

(function () {

  'use strict';

  var assign = __webpack_require__(8);
  var vary = __webpack_require__(9);

  var defaults = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    };

  function isString(s) {
    return typeof s === 'string' || s instanceof String;
  }

  function isOriginAllowed(origin, allowedOrigin) {
    if (Array.isArray(allowedOrigin)) {
      for (var i = 0; i < allowedOrigin.length; ++i) {
        if (isOriginAllowed(origin, allowedOrigin[i])) {
          return true;
        }
      }
      return false;
    } else if (isString(allowedOrigin)) {
      return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
    } else {
      return !!allowedOrigin;
    }
  }

  function configureOrigin(options, req) {
    var requestOrigin = req.headers.origin,
      headers = [],
      isAllowed;

    if (!options.origin || options.origin === '*') {
      // allow any origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: '*'
      }]);
    } else if (isString(options.origin)) {
      // fixed origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: options.origin
      }]);
      headers.push([{
        key: 'Vary',
        value: 'Origin'
      }]);
    } else {
      isAllowed = isOriginAllowed(requestOrigin, options.origin);
      // reflect origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: isAllowed ? requestOrigin : false
      }]);
      headers.push([{
        key: 'Vary',
        value: 'Origin'
      }]);
    }

    return headers;
  }

  function configureMethods(options) {
    var methods = options.methods;
    if (methods.join) {
      methods = options.methods.join(','); // .methods is an array, so turn it into a string
    }
    return {
      key: 'Access-Control-Allow-Methods',
      value: methods
    };
  }

  function configureCredentials(options) {
    if (options.credentials === true) {
      return {
        key: 'Access-Control-Allow-Credentials',
        value: 'true'
      };
    }
    return null;
  }

  function configureAllowedHeaders(options, req) {
    var allowedHeaders = options.allowedHeaders || options.headers;
    var headers = [];

    if (!allowedHeaders) {
      allowedHeaders = req.headers['access-control-request-headers']; // .headers wasn't specified, so reflect the request headers
      headers.push([{
        key: 'Vary',
        value: 'Access-Control-Request-Headers'
      }]);
    } else if (allowedHeaders.join) {
      allowedHeaders = allowedHeaders.join(','); // .headers is an array, so turn it into a string
    }
    if (allowedHeaders && allowedHeaders.length) {
      headers.push([{
        key: 'Access-Control-Allow-Headers',
        value: allowedHeaders
      }]);
    }

    return headers;
  }

  function configureExposedHeaders(options) {
    var headers = options.exposedHeaders;
    if (!headers) {
      return null;
    } else if (headers.join) {
      headers = headers.join(','); // .headers is an array, so turn it into a string
    }
    if (headers && headers.length) {
      return {
        key: 'Access-Control-Expose-Headers',
        value: headers
      };
    }
    return null;
  }

  function configureMaxAge(options) {
    var maxAge = options.maxAge && options.maxAge.toString();
    if (maxAge && maxAge.length) {
      return {
        key: 'Access-Control-Max-Age',
        value: maxAge
      };
    }
    return null;
  }

  function applyHeaders(headers, res) {
    for (var i = 0, n = headers.length; i < n; i++) {
      var header = headers[i];
      if (header) {
        if (Array.isArray(header)) {
          applyHeaders(header, res);
        } else if (header.key === 'Vary' && header.value) {
          vary(res, header.value);
        } else if (header.value) {
          res.setHeader(header.key, header.value);
        }
      }
    }
  }

  function cors(options, req, res, next) {
    var headers = [],
      method = req.method && req.method.toUpperCase && req.method.toUpperCase();

    if (method === 'OPTIONS') {
      // preflight
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options, req));
      headers.push(configureMethods(options, req));
      headers.push(configureAllowedHeaders(options, req));
      headers.push(configureMaxAge(options, req));
      headers.push(configureExposedHeaders(options, req));
      applyHeaders(headers, res);

      if (options.preflightContinue ) {
        next();
      } else {
        // Safari (and potentially other browsers) need content-length 0,
        //   for 204 or they just hang waiting for a body
        res.statusCode = options.optionsSuccessStatus || defaults.optionsSuccessStatus;
        res.setHeader('Content-Length', '0');
        res.end();
      }
    } else {
      // actual response
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options, req));
      headers.push(configureExposedHeaders(options, req));
      applyHeaders(headers, res);
      next();
    }
  }

  function middlewareWrapper(o) {
    // if options are static (either via defaults or custom options passed in), wrap in a function
    var optionsCallback = null;
    if (typeof o === 'function') {
      optionsCallback = o;
    } else {
      optionsCallback = function (req, cb) {
        cb(null, o);
      };
    }

    return function corsMiddleware(req, res, next) {
      optionsCallback(req, function (err, options) {
        if (err) {
          next(err);
        } else {
          var corsOptions = assign({}, defaults, options);
          var originCallback = null;
          if (corsOptions.origin && typeof corsOptions.origin === 'function') {
            originCallback = corsOptions.origin;
          } else if (corsOptions.origin) {
            originCallback = function (origin, cb) {
              cb(null, corsOptions.origin);
            };
          }

          if (originCallback) {
            originCallback(req.headers.origin, function (err2, origin) {
              if (err2 || !origin) {
                next(err2);
              } else {
                corsOptions.origin = origin;
                cors(corsOptions, req, res, next);
              }
            });
          } else {
            next();
          }
        }
      });
    };
  }

  // can pass either an options hash, an options delegate, or nothing
  module.exports = middlewareWrapper;

}());


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("vary");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Package {
  constructor(options) {
    this.id = options.id;
    this.destination = options.destination;
    this.pickupLocation = options.pickupLocation;
    this.deadline = options.deadline;
  }

  maximumWaitTime(speed){
    return this.deadline - this.destination.etaTo(this.pickupLocation, speed);
  }
}

Package.prototype.soonestPackages = (packages) => (
  packages.sort((a, b) => a.maximumWaitTime(50) - b.maximumWaitTime(50))
);


/* harmony default export */ __webpack_exports__["a"] = (Package);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_drone_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_package_js__ = __webpack_require__(10);



const dispatcher = (foo) => {
  const orderedDrones = __WEBPACK_IMPORTED_MODULE_0__lib_drone_js__["a" /* default */].prototype.soonestDrones(foo.drones);
  const orderedPackages = __WEBPACK_IMPORTED_MODULE_1__lib_package_js__["a" /* default */].prototype.soonestPackages(foo.packages);
  const unassignedPackages = [];
  const assignedPackages = [];

  orderedDrones.forEach( drone => {
    let parcel;
    if (orderedPackages.length) {
      parcel = orderedPackages.shift();
      if (drone.undeliverable(parcel)) {
        unassignedPackages.push(parcel.id);
        parcel = orderedPackages.shift();
        if (!parcel) return;
      }
      assignedPackages.push({droneId: drone.id, packageId: parcel.id});
    } else {
      return;
    }
  });

  const leftoverPackIDS = orderedPackages.forEach(parcel =>{
    unassignedPackages.push(parcel.id);
  } );

  return {assignedPackages, unassignedPackages};
};

/* harmony default export */ __webpack_exports__["a"] = (dispatcher);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map