'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }