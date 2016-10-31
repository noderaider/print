'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = onPrint;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onPrint() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      preprint = _ref.preprint,
      postprint = _ref.postprint;

  if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object') return;
  if (window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    if (preprint) window.addEventListener('beforeprint', preprint);
    if (postprint) window.addEventListener('afterprint', postprint);

    return function dispose() {
      if (preprint) window.removeEventListener('beforeprint', preprint);
      if (postprint) window.removeEventListener('afterprint', postprint);
    };
  } else if (preprint || postprint) {
    var _ret = function () {
      var mqlListener = function mqlListener(mql) {
        if (mql.matches && preprint) preprint();else if (!mql.matches && postprint) postprint();
      };

      var mql = window.matchMedia('print');
      mql.addListener(mqlListener);
      return {
        v: function disposeMedia() {
          mql.removeListener(mqlListener);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
  } else {
    return function () {};
  }
}