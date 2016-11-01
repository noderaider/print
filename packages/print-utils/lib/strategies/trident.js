'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trident;

var _utils = require('../utils');

function trident(frame) {
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

  function preprint() {
    var frameDocument = (0, _utils.resolveDocument)(frame);
    printElement.innerHTML = frameDocument.body.innerHTML;
    // TRY SPINNING IN CHROME TO DELAY IT
  }

  function postprint() {}

  function dispose() {
    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoFramePrintCSS) undoFramePrintCSS();
  }

  return { preprint: preprint, postprint: postprint, dispose: dispose };
}