'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = copyHeadStyles;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyHeadStyles(sourceDocument, targetDocument) {
  (0, _invariant2.default)(sourceDocument, 'source document is required');
  (0, _invariant2.default)(sourceDocument.head, 'source document must have a head');
  (0, _invariant2.default)(targetDocument, 'target document is required');
  (0, _invariant2.default)(targetDocument.head, 'target document must have a head');
  var sourceStyles = sourceDocument.querySelectorAll('head > style');
  var _undos = new _set2.default();
  (0, _from2.default)(sourceStyles).forEach(function (style) {
    var _style = document.createElement('style');
    _style.innerHTML = style.innerHTML;
    targetDocument.head.appendChild(_style);
    _undos.add(function () {
      return targetDocument.head.removeChild(_style);
    });
  });
  return function () {
    return _undos.forEach(function (undo) {
      return undo();
    });
  };
}