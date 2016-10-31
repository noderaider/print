'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _containerStrategy = require('./containerStrategy');

Object.defineProperty(exports, 'containerStrategy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_containerStrategy).default;
  }
});

var _frameStrategy = require('./frameStrategy');

Object.defineProperty(exports, 'frameStrategy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_frameStrategy).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }