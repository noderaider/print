'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

exports.default = setStyles;

var _serializeCSSProperty = require('./serializeCSSProperty');

var _serializeCSSProperty2 = _interopRequireDefault(_serializeCSSProperty);

var _parseCSSProperty2 = require('./parseCSSProperty');

var _parseCSSProperty3 = _interopRequireDefault(_parseCSSProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setStyles(element, styles) {
  var prevStyles = (0, _entries2.default)(styles).reduce(function (prev, _ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        next = _ref2[1];

    if (!element.style) {
      console.warn('element has no style', element);
      return prev;
    }

    var prop = { value: element.style.getPropertyValue(key), priority: element.style.getPropertyPriority(key) };
    console.info('SET STYLES', key, next, prop);
    var serialized = prop.value ? (0, _serializeCSSProperty2.default)(prop) : null;
    (0, _defineProperty2.default)(prev, key, { value: serialized, enumerable: true });
    if (next) {
      var _parseCSSProperty = (0, _parseCSSProperty3.default)(next),
          value = _parseCSSProperty.value,
          priority = _parseCSSProperty.priority;

      element.style.setProperty(key, value, priority);
    } else {
      element.style.removeProperty(key);
    }
    return prev;
  }, {});
  return function undoStyles() {
    setStyles(element, prevStyles);
  };
}