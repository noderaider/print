'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = setScreenCSS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylesID = 'use-print-frame-screen-styles';
function setScreenCSS(doc, css) {
  if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object') return;
  if (doc.getElementById(stylesID)) throw new Error('setScreenCSS should not be registered twice on the same document - call undoPrintCSS first.');
  var styleElement = doc.createElement('style');
  styleElement.setAttribute('id', stylesID);
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('media', 'screen');
  styleElement.innerHTML = css;
  document.getElementsByTagName('head')[0].appendChild(styleElement);
  return function undoPrintCSS() {
    document.getElementsByTagName('head')[0].removeChild(styleElement);
  };
}