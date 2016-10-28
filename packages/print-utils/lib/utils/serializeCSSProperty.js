'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = serializeCSSProperty;
function serializeCSSProperty(prop) {
  if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object' || !prop.value) throw new Error('serializeCSSProperty requires an object property with value and priority (optional) keys.');
  var value = prop.value,
      priority = prop.priority;

  return priority ? value + ' !' + priority : value;
}