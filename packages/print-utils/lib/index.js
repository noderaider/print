'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStyles = exports.setCSS = exports.isFrame = exports.usePrintFrame = exports.onPrint = exports.modes = undefined;

var _onPrint = require('./onPrint');

Object.defineProperty(exports, 'onPrint', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_onPrint).default;
  }
});

var _usePrintFrame = require('./usePrintFrame');

Object.defineProperty(exports, 'usePrintFrame', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_usePrintFrame).default;
  }
});

var _isFrame = require('./utils/isFrame');

Object.defineProperty(exports, 'isFrame', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFrame).default;
  }
});

var _setCSS = require('./utils/setCSS');

Object.defineProperty(exports, 'setCSS', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setCSS).default;
  }
});

var _setStyles = require('./utils/setStyles');

Object.defineProperty(exports, 'setStyles', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_setStyles).default;
  }
});

require('babel-register');

var _modes = require('./modes');

var modes = _interopRequireWildcard(_modes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.modes = modes;