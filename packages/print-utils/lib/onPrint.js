'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = onPrint;
function onPrint() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      preprint = _ref.preprint,
      postprint = _ref.postprint;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    console.info('onPrint => STRATEGY 1');
    if (preprint) window.onbeforeprint = preprint;
    if (postprint) window.onafterprint = postprint;
    return function dispose() {
      if (preprint) window.onbeforeprint = null;
      if (postprint) window.onafterprint = null;
    };
  } else if (preprint || postprint) {
    var _ret = function () {
      var mqlListener = function mqlListener(mql) {
        if (mql.matches && preprint) preprint();else if (!mql.matches && postprint) postprint();
      };

      console.info('onPrint => STRATEGY 2');

      var mql = window.matchMedia('print');
      mql.addListener(mqlListener);
      return {
        v: function disposeMedia() {
          console.info('DISPOSING STRATEGY 2');
          mql.removeListener(mqlListener);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    console.info('onPrint => STRATEGY 3');
    return function () {};
  }
}