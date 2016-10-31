'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = usePrintFrame;

var _onPrint = require('./onPrint');

var _onPrint2 = _interopRequireDefault(_onPrint);

var _strategies = require('./strategies');

var strategies = _interopRequireWildcard(_strategies);

var _browserDetective = require('browser-detective');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function round(num) {
  return Math.floor(num * 100) / 100;
}
var scaleToWidth = 700;
function getScale(width) {
  return round(scaleToWidth / width);
}
function descaleHeight(height, scaleFactor) {
  return height * scaleFactor;
}

var browser = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' ? (0, _browserDetective.detectBrowser)() : {};
console.info('BROWSER DETECTED\n', (0, _stringify2.default)(browser, null, 2));

var defaultStrategy = 'containerStrategy';
if (browser.name === 'chrome') {} else if (browser.name === 'firefox') {
  defaultStrategy = 'frameStrategy';
} else if (browser.name === 'safari') {} else if (browser.name === 'ie') {
  defaultStrategy = 'frameStrategy';
}

function usePrintFrame(frame) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$strategy = _ref.strategy,
      strategy = _ref$strategy === undefined ? defaultStrategy : _ref$strategy,
      opts = (0, _objectWithoutProperties3.default)(_ref, ['strategy']);

  if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object') return;
  if (!frame) throw new Error('usePrintFrame must be provided the frame element.');

  console.info('USING STRATEGY', strategy);
  var useStrategy = strategies[strategy];
  if (!useStrategy) throw new Error('Unknown strategy \'' + strategy + '\'!');

  var _useStrategy = useStrategy(frame, opts),
      preprint = _useStrategy.preprint,
      postprint = _useStrategy.postprint,
      dispose = _useStrategy.dispose;

  (0, _onPrint2.default)({ preprint: preprint, postprint: postprint });
  return dispose;
}
/*
* {
overflow: visible !important;
margin: 0 !important;
margin-top: 0 !important;
margin-bottom: 0 !important;
margin-left: 0 !important;
margin-right: 0 !important;
padding: 0 !important;
padding-top: 0 !important;
padding-bottom: 0 !important;
padding-left: 0 !important;
padding-right: 0 !important;
}
body {
width: 700px !important;
border-color: 1px solid yellow;
}
*/