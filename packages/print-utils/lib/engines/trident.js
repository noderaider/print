'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = gecko;

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gecko(frame) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var topPrintCSS = '\n* {\n  overflow: visible !important;\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  float: none !important;\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n}\nbody > *:not(#print-content),\nbody > *:not(#print-content) * {\n  display: none !important;\n  position: unset !important;\n}\nbody > #print-content {\n  display: inline !important;\n}\n';
  var framePrintCSS = '\n  ';
  var printElement = document.createElement('div');
  printElement.setAttribute('id', 'print-content');
  printElement.setAttribute('style', 'display: none');
  document.body.insertBefore(printElement, document.body.firstChild);

  var undoTopPrintCSS = void 0;
  var undoFramePrintCSS = void 0;
  frame.addEventListener('load', function () {
    var frameDocument = (0, _utils.resolveDocument)(frame);
    undoTopPrintCSS = topPrintCSS ? (0, _utils.setCSS)(document, topPrintCSS, 'print') : function () {};
    undoFramePrintCSS = framePrintCSS ? (0, _utils.setCSS)(frameDocument, framePrintCSS, 'print') : function () {};
  });

  function copyStyles(source, target) {
    var styles = window.getComputedStyle(source);
    var oldStyles = new _map2.default();
    var styleMap = (0, _from2.default)(styles).filter(function (x) {
      var value = styles[x];
      return typeof value === 'string' && value.length > 0 && value !== 'normal';
    }).map(function (x) {
      return [x, styles[x]];
    }).reduce(function (style, _ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];

      oldStyles.set(name, style.getPropertyValue(name));
      style.setProperty(name, value);
      return style;
    }, target.style);
    return function () {
      return oldStyles.forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            name = _ref4[0],
            value = _ref4[1];

        target.style.setProperty(name, value);
      });
    };
  }

  var undos = new _set2.default();

  function preprint() {
    var frameDocument = (0, _utils.resolveDocument)(frame);
    printElement.innerHTML = frameDocument.body.innerHTML;
    undos.add(copyStyles(frameDocument.body, printElement));
    /* COPY CHILD NODES STYLES (UNNECESSARY?)
    Array.from(frameDocument.body.childNodes).forEach((node, i) => {
      undos.add(copyStyles(node, printElement.childNodes[i]))
    })
    */
  }

  function postprint() {
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

    undos.clear();
    printElement.setAttribute('style', 'display: none');
  }

  function dispose() {
    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoFramePrintCSS) undoFramePrintCSS();
  }

  return { preprint: preprint, postprint: postprint, dispose: dispose };
}