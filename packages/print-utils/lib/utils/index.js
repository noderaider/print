'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseCSSProperty = require('./parseCSSProperty');

Object.defineProperty(exports, 'parseCSSProperty', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_parseCSSProperty).default;
  }
});

var _serializeCSSProperty = require('./serializeCSSProperty');

Object.defineProperty(exports, 'serializeCSSProperty', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_serializeCSSProperty).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }