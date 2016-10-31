'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFrame = exports.usePrintFrame = exports.onPrint = undefined;

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

require('babel-register');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }