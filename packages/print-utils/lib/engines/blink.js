'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = webkit;

var _utils = require('../utils');

var _modes = require('../modes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = '\n#print-directions {\n  display: none;\n  color: black;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  align-items:center;\n  justify-content:center;\n  font-size:1.2rem;\n}\n\n@media print {\n  body > *:not(#print-directions) {\n    display: none !important;\n  }\n  body #print-directions {\n    display: flex !important;\n    flex-direction: column;\n  }\n}\n';

function webkit(frame, _ref) {
  var mode = _ref.mode,
      directionsHTML = _ref.directionsHTML;

  var topPrintCSS = '\n* {\n  overflow: visible !important;\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  float: none !important;\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n}\nbody > *:not(#print-content),\nbody > *:not(#print-content) * {\n  display: none !important;\n  position: unset !important;\n}\niframe {\n  display: none !important;\n  width: 0 !important;\n  min-width: 0 !important;\n  max-width: 0 !important;\n  border: 0 !important;\n  padding: 0 !important;\n}\nbody > #print-content {\n  display: inline !important;\n}\n';
  var framePrintCSS = '\n  ';

  function printSizing() {
    var undoCSS = (0, _utils.setCSS)(document, css, null, { id: 'print-zoom' });
    var printDirectionsElement = document.getElementById('print-directions');
    if (!printDirectionsElement) {
      printDirectionsElement = document.createElement('div');
      printDirectionsElement.innerHTML = directionsHTML;
      printDirectionsElement.setAttribute('id', 'print-directions');
      document.body.insertBefore(printDirectionsElement, document.body.children[0]);
    }

    frame.removeEventListener('load', printSizing);
    undos.add(function () {
      undoCSS();
      document.body.removeChild(printDirectionsElement);
    });
  }

  var printElement = document.getElementById('print-content');

  var undos = new _set2.default();
  var undoTopPrintCSS = void 0;
  var undoHeadLinks = void 0;
  if (mode === _modes.POLLING) {
    (function () {
      var init = function init() {
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
        if (timeoutID) clearTimeout(timeoutID);
        if (intervalID) clearInterval(intervalID);
        timeoutID = setTimeout(function () {
          preprint();
          postprint();
          intervalID = setInterval(function () {
            preprint();
            postprint();
          }, 8000);
        }, 5000);

        frame.removeEventListener('load', printSizing);
      };

      var timeoutID = void 0;
      var intervalID = void 0;

      if (!printElement) {
        printElement = document.createElement('div');
        printElement.setAttribute('id', 'print-content');
        printElement.setAttribute('style', 'display: none');
        document.body.insertBefore(printElement, document.body.firstChild);
      }

      frame.addEventListener('load', init);
    })();
  } else if (mode === _modes.TRIGGERED) {
    frame.addEventListener('load', printSizing);
  }

  function preprint() {
    if (mode === _modes.POLLING) {
      var startPreprint = performance.now();
      try {
        var frameDocument = (0, _utils.resolveDocument)(frame);
        printElement.innerHTML = frameDocument.body.innerHTML;
        (0, _from2.default)(printElement.querySelectorAll('link')).forEach(function (link) {
          return link.setAttribute('media', 'print');
        });
        undos.add((0, _utils.copyStyles)(frameDocument.body, printElement));
        undos.add((0, _utils.copyHeadStyles)(frameDocument, document));
        //undos.add(() => { printElement.innerHTML = '' })
      } catch (ex) {
        console.info('PREPRINT ERROR');
      }
      var endPreprint = performance.now();
      console.info('PREPRINT', endPreprint - startPreprint);
    }
  }

  function postprint() {
    if (mode === _modes.POLLING) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(undos), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var undo = _step2.value;

          undo();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      undos.clear();
      printElement.setAttribute('style', 'display: none');
    }
  }

  function dispose() {
    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoHeadLinks) undoHeadLinks();
  }

  function trigger() {
    preprint();
    frame.contentWindow.focus();
    frame.contentWindow.print();
    postprint();
  }

  return { preprint: preprint, postprint: postprint, dispose: dispose, trigger: trigger };
}