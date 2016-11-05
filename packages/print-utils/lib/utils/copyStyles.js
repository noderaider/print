'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.default = copyStyles;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyStyles(sourceElement, targetElement) {
  var window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : global;

  (0, _invariant2.default)(sourceElement, 'sourceElement is required');
  (0, _invariant2.default)(targetElement, 'targetElement is required');
  var sourceStyles = window.getComputedStyle(sourceElement);
  var undos = [];
  var styleMap = (0, _from2.default)(sourceStyles).map(function (name) {
    return [name, sourceStyles.getPropertyValue(name), sourceStyles.getPropertyPriority(name)];
  }).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    return typeof value === 'string' && value.length > 0 && value !== 'normal';
  }).reduce(function (targetStyle, _ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 3),
        name = _ref4[0],
        value = _ref4[1],
        priority = _ref4[2];

    var prevStyle = [targetElement.style.getPropertyValue(name), targetElement.style.getPropertyPriority(name)];
    undos.push(function () {
      var _targetElement$style;

      return (_targetElement$style = targetElement.style).setProperty.apply(_targetElement$style, [name].concat(prevStyle));
    });
    targetStyle.setProperty(name, value, priority);
    return targetStyle;
  }, targetElement.style);
  return function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(undos), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var undo = _step.value;

        undo();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
}