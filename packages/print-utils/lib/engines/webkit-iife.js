'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = webkit;

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = function () {
  var div = document.getElementById('__marks__');
  if (!div) {
    div = document.body.appendChild(document.createElement('div'));
    div.setAttribute('id', '__marks__');
    div.setAttribute('style', 'position:absolute;height:1px;width:1px;left:0;display:none;');
  }
  return {
    adjustMarks: function adjustMarks(top) {
      div.style.setProperty('top', top + 'px', 'important');
    },
    showMarks: function showMarks() {
      div.style.setProperty('display', 'inline-block', 'important');
    },
    hideMarks: function hideMarks() {
      div.style.setProperty('display', 'none', 'important');
    }
  };
}(),
    adjustMarks = _ref.adjustMarks,
    showMarks = _ref.showMarks,
    hideMarks = _ref.hideMarks;

function webkit(frame) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var startWebkit = performance.now();
  var topPrintCSS = '\n* {\n  overflow: visible !important;\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  float: none !important;\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n}\niframe {\n  display: none !important;\n  width: 0 !important;\n  min-width: 0 !important;\n  max-width: 0 !important;\n  border: 0 !important;\n  padding: 0 !important;\n}\n';
  var printElement = document.createElement('div');
  printElement.setAttribute('id', 'print-content');
  printElement.setAttribute('style', 'display: none');
  document.body.insertBefore(printElement, document.body.firstChild);

  var undos = new _set2.default();
  var undoTopPrintCSS = void 0;
  var undoHeadLinks = void 0;
  frame.addEventListener('load', function () {
    var frameDocument = (0, _utils.resolveDocument)(frame);
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
    if (undoTopPrintCSS) undoTopPrintCSS();
    undoTopPrintCSS = topPrintCSS ? (0, _utils.setCSS)(document, topPrintCSS, 'print', { id: 'top-css' }) : function () {};
    undoHeadLinks = (0, _utils.copyHeadLinks)(frameDocument, document);
    adjustMarks(frameDocument.body.offsetHeight);
    /*
    raf(() => {
      let undoStyles = applyStyles()
      raf(() => {
        undoStyles()
      })
    })
    */
  });

  var undoStyles = void 0;
  var preprint = function () {
    return function () {
      var startPreprint = performance.now();
      showMarks();

      var frameDocument = (0, _utils.resolveDocument)(frame);
      //printElement.innerHTML = frameDocument.body.innerHTML
      undoStyles = [(0, _utils.replaceNode)(frameDocument.body, document.body)
      //, copyStyles(frameDocument.body, printElement)
      , (0, _utils.copyHeadStyles)(frameDocument, document)];
      var endPreprint = performance.now();
      console.info('ELAPSED (preprint)', endPreprint - startPreprint);
    };
  }();

  var postprint = function () {
    return function () {
      while (undoStyles.length > 0) {
        undoStyles.pop()();
      }
    };
  }();

  function dispose() {
    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoHeadLinks) undoHeadLinks();
  }

  var endWebkit = performance.now();
  console.info('ELAPSED (WEBKIT)', endWebkit - startWebkit);
  return { preprint: preprint, postprint: postprint, dispose: dispose };
}