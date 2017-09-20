'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.default = copyHeadLinks;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyHeadLinks(sourceDocument, targetDocument) {
  (0, _invariant2.default)(sourceDocument, 'source document is required');
  (0, _invariant2.default)(sourceDocument.head, 'source document must have a head');
  (0, _invariant2.default)(targetDocument, 'target document is required');
  (0, _invariant2.default)(targetDocument.head, 'target document must have a head');
  var sourceLinks = sourceDocument.querySelectorAll('head > link');
  //const _undos = new Set()
  (0, _from2.default)(sourceLinks).forEach(function (link) {
    var _link = document.createElement('link');
    if (_link.getAttribute('media') === 'screen') return;
    _link.setAttribute('href', link.getAttribute('href'));
    _link.setAttribute('type', 'text/css');
    _link.setAttribute('media', 'print');
    _link.setAttribute('rel', 'stylesheet');
    _link.setAttribute('id', 'printCopy');
    targetDocument.head.appendChild(_link);
    //_undos.add(() => targetDocument.head.removeChild(_link))
  });
  return function () {
    var targetLinks = targetDocument.querySelectorAll('#printCopy');
    (0, _from2.default)(targetLinks).forEach(function (link) {
      targetDocument.head.removeChild(link);
    });
  };
}