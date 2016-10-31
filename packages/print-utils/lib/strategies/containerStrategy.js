'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = containerStrategy;

var _utils = require('../utils');

function containerStrategy(frame) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var topPrintCSS = '\n* {\n  overflow: visible !important;\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\nbody, html {\n  height: 100vh;\n}\nbody > *:not(#print-content),\nbody > *:not(#print-content) * {\n  display: none !important;\n  position: unset !important;\n}\nbody > #print-content,\nbody > #print-content * {\n  display: inline-block !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  max-width: 750px !important;\n}\n';
  var framePrintCSS = '\n  ';
  var printElement = document.createElement('div');
  printElement.setAttribute('id', 'print-content');
  printElement.setAttribute('style', 'display: none');
  document.body.insertBefore(printElement, document.body.firstChild);

  var undoTopCSS = topPrintCSS ? (0, _utils.setPrintCSS)(document, topPrintCSS) : function () {};
  var undoFrameCSS = framePrintCSS ? (0, _utils.setPrintCSS)((0, _utils.resolveDocument)(frame), framePrintCSS) : function () {};
  frame.addEventListener('load', function () {
    var frameDocument = (0, _utils.resolveDocument)(frame);
    undoFrameCSS = framePrintCSS ? (0, _utils.setPrintCSS)(frameDocument, framePrintCSS) : function () {};
    printElement.innerHTML = frameDocument.body.innerHTML;
  });

  function preprint() {}

  function postprint() {}

  function dispose() {}

  return { preprint: preprint, postprint: postprint, dispose: dispose };
}