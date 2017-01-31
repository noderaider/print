'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = setCSS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setCSS(doc, css, media) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$id = _ref.id,
      id = _ref$id === undefined ? 'use-print-frame-styles' : _ref$id;

  if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object') return;

  var oldCSS = doc.querySelector('head > #' + id);
  if (oldCSS) doc.head.removeChild(oldCSS);
  var styleElement = doc.createElement('style');
  styleElement.setAttribute('id', id);
  styleElement.setAttribute('type', 'text/css');
  if (media) styleElement.setAttribute('media', media);
  styleElement.innerHTML = css;
  doc.getElementsByTagName('head')[0].appendChild(styleElement);
  return function undoPrintCSS() {
    var head = doc.getElementsByTagName('head');
    try {
      head[0].removeChild(styleElement);
    } catch (err) {}
  };
}