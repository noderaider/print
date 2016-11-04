'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = copyStyles;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyStyles(sourceElement, targetElement) {
  var window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : global;

  (0, _invariant2.default)(sourceElement, 'sourceElement is required');
  (0, _invariant2.default)(targetElement, 'targetElement is required');
  var styles = window.getComputedStyle(sourceElement);
  var oldStyles = new _map2.default();
  var styleMap = (0, _from2.default)(styles).filter(function (x) {
    var value = styles.getPropertyValue(x);
    return typeof value === 'string' && value.length > 0 && value !== 'normal';
  }).map(function (x) {
    return [x, styles.getPropertyValue(x)];
  }).reduce(function (style, _ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    oldStyles.set(name, style.getPropertyValue(name));
    style.setProperty(name, value);
    return style;
  }, targetElement.style);
  return function () {
    return (0, _entries2.default)(oldStyles).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          name = _ref4[0],
          value = _ref4[1];

      targetElement.style.setProperty(name, value);
    });
  };
}