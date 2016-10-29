'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = serializeCSSProperty;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeCSSProperty(prop) {
  if ((typeof prop === 'undefined' ? 'undefined' : (0, _typeof3.default)(prop)) !== 'object' || !prop.value) throw new Error('serializeCSSProperty requires an object property with value and priority (optional) keys.');
  var value = prop.value,
      priority = prop.priority;

  return priority ? value + ' !' + priority : value;
}