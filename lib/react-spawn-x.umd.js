(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("ReactSpawn", ["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSpawn"] = factory(require("react"));
	else
		root["ReactSpawn"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _helpers = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connect = function connect(store) {
  return function (selection) {
    return function (WrappedComponent) {
      return function (_Component) {
        _inherits(ConnectWrapper, _Component);

        function ConnectWrapper(props) {
          _classCallCheck(this, ConnectWrapper);

          var _this = _possibleConstructorReturn(this, (ConnectWrapper.__proto__ || Object.getPrototypeOf(ConnectWrapper)).call(this, props));

          _this.updateWithRelevantState = function () {
            Object.keys(selection).forEach(function (key) {
              if ((0, _helpers.isString)(selection[key])) {
                _this.checkState(key, selection[key]);

                return false;
              }

              if ((0, _helpers.isArray)(selection[key])) {
                if (selection[key].length === 1 && (0, _helpers.isString)(selection[key][0])) {
                  _this.checkState(key, selection[key][0]);

                  return false;
                }

                if (selection[key].length > 1 && (0, _helpers.isFunc)(selection[key][1])) {
                  _this.checkState(key, selection[key][1]);

                  return false;
                }
              }

              return (0, _helpers.error)('react-spawn-x: incorrect arguments for selection');
            });
          };

          _this.relevantState = {};
          return _this;
        }

        _createClass(ConnectWrapper, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.resolve(true);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.resolve(false);
          }
        }, {
          key: 'resolve',
          value: function resolve(onInit) {
            var _this2 = this;

            Object.keys(selection).forEach(function (key) {
              if ((0, _helpers.isString)(selection[key])) {
                if (onInit) {
                  _this2.detect(selection[key]);
                } else {
                  _this2.reject(selection[key]);
                }

                return false;
              }

              if ((0, _helpers.isArray)(selection[key])) {
                if (onInit) {
                  _this2.detect.apply(_this2, _toConsumableArray(selection[key]));
                } else {
                  _this2.reject.apply(_this2, _toConsumableArray(selection[key]));
                }

                return false;
              }

              return (0, _helpers.error)('react-spawn-x: incorrect arguments for selection');
            });
          }
        }, {
          key: 'detect',
          value: function detect(zone) {
            store.detect(zone, this.updateWithRelevantState);
          }
        }, {
          key: 'reject',
          value: function reject(zone) {
            store.reject(zone, this.updateWithRelevantState);
          }
        }, {
          key: 'checkState',
          value: function checkState(key, selectionKey) {
            var selectedState = store.select(selectionKey);

            if (!(0, _helpers.deepEqual)(selectedState, this.relevantState[key])) {
              this.relevantState[key] = selectedState;
              this.forceUpdate();
            }
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.relevantState));
          }
        }]);

        return ConnectWrapper;
      }(_react.Component);
    };
  };
};

exports.connect = connect;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isArray(target) {
  return Array.isArray(target);
}

function isFunc(target) {
  return typeof target === 'function';
}

function isString(target) {
  return typeof target === 'string';
}

function error(message) {
  throw new Error(message);
}

exports.deepEqual = deepEqual;
exports.isArray = isArray;
exports.isFunc = isFunc;
exports.isString = isString;
exports.error = error;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.isString = exports.isFunc = exports.isArray = exports.deepEqual = undefined;

var _helpers = __webpack_require__(1);

exports.deepEqual = _helpers.deepEqual;
exports.isArray = _helpers.isArray;
exports.isFunc = _helpers.isFunc;
exports.isString = _helpers.isString;
exports.error = _helpers.error;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _connect = __webpack_require__(0);

exports.connect = _connect.connect;

/***/ })
/******/ ]);
});