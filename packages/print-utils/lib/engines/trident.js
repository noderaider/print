'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = gecko;

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gecko(frame) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var topPrintCSS = '\n* {\n  overflow: visible !important;\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  float: none !important;\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n}\nbody > *:not(#print-content),\nbody > *:not(#print-content) * {\n  display: none !important;\n  position: unset !important;\n}\niframe {\n  display: none !important;\n  width: 0 !important;\n  min-width: 0 !important;\n  max-width: 0 !important;\n  border: 0 !important;\n  padding: 0 !important;\n}\nbody > #print-content {\n  display: inline !important;\n}\n';
  var framePrintCSS = '\n  ';
  var printElement = document.createElement('div');
  printElement.setAttribute('id', 'print-content');
  printElement.setAttribute('style', 'display: none');
  document.body.insertBefore(printElement, document.body.firstChild);

  var undos = new _set2.default();
  function undoAll() {
    if (undos.size > 0) {
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
    }
  }
  var undoTopPrintCSS = void 0;
  var undoFramePrintCSS = void 0;
  var undoHeadStyles = void 0;
  frame.addEventListener('load', function () {
    var frameDocument = (0, _utils.resolveDocument)(frame);
    undoAll();
    if (undoTopPrintCSS) undoTopPrintCSS();
    undoTopPrintCSS = topPrintCSS ? (0, _utils.setCSS)(document, topPrintCSS, 'print', { id: 'top-css' }) : function () {};
    undoHeadStyles = copyHeadStyles(frameDocument, document);
    /*
    setTimeout(() => {
      let frameHeight = frameDocument.body.offsetHeight
      if(frameHeight === 0)
        throw new Error('frameHeight still 0')
      frame.style.setProperty('height', `${frameHeight}px`)
      frame.parentNode.style.setProperty('height', `${frameHeight}px`)
    }, 500)
    */
  });

  function copyStyles(sourceElement, targetElement) {
    var styles = window.getComputedStyle(sourceElement);
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
    }, targetElement.style);
    return function () {
      return oldStyles.forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            name = _ref4[0],
            value = _ref4[1];

        targetElement.style.setProperty(name, value);
      });
    };
  }

  var startsWithPrint = /^\s*@media print/;

  function copyHeadStyles(sourceDocument, targetDocument) {
    var sourceLinks = sourceDocument.querySelectorAll('head > link');
    var sourceStyles = sourceDocument.querySelectorAll('head > style');
    var _undos = new _set2.default();
    (0, _from2.default)(sourceLinks).forEach(function (link) {
      var _link = document.createElement('link');
      _link.setAttribute('href', link.getAttribute('href'));
      _link.setAttribute('type', 'text/css');
      _link.setAttribute('media', 'print');
      _link.setAttribute('rel', 'stylesheet');
      targetDocument.head.appendChild(_link);
      _undos.add(function () {
        return targetDocument.head.removeChild(_link);
      });
    });
    (0, _from2.default)(sourceStyles).forEach(function (style) {
      console.info('COPYING STYLE ELEMENT', style);
      var _style = document.createElement('style');
      var isPrint = startsWithPrint.test(style.innerHTML);
      _style.innerHTML = isPrint ? style.innerHTML : '\n@media print {\n  ' + style.innerHTML + '\n}';
      targetDocument.head.appendChild(_style);
      _undos.add(function () {
        return targetDocument.head.removeChild(_style);
      });
    });
    return function () {
      return _undos.forEach(function (fn) {
        return fn();
      });
    };
  }

  function preprint() {
    var frameDocument = (0, _utils.resolveDocument)(frame);
    printElement.innerHTML = frameDocument.body.innerHTML;
    undos.add(copyStyles(frameDocument.body, printElement));
    //undos.add(copyHeadStyles(frameDocument, document))
    /* COPY CHILD NODES STYLES (UNNECESSARY?)
    Array.from(frameDocument.body.childNodes).forEach((node, i) => {
      undos.add(copyStyles(node, printElement.childNodes[i]))
    })
    */
  }

  function postprint() {
    undoAll();
    printElement.setAttribute('style', 'display: none');
  }

  function dispose() {
    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoFramePrintCSS) undoFramePrintCSS();
    if (undoHeadStyles) undoHeadStyles();
  }

  return { preprint: preprint, postprint: postprint, dispose: dispose };
}