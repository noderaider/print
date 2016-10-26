'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = printEvents;
function printEvents() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$preprint = _ref.preprint,
      preprint = _ref$preprint === undefined ? function () {} : _ref$preprint,
      _ref$postprint = _ref.postprint,
      postprint = _ref$postprint === undefined ? function () {} : _ref$postprint;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (window.matchMedia) {
    window.matchMedia('print').addListener(function (mql) {
      return (mql.matches ? preprint : postprint)();
    });
  } else {
    window.onbeforeprint = preprint;
    window.onafterprint = postprint;
  }
}