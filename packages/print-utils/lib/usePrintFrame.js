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

var _engines = require('./engines');

var engines = _interopRequireWildcard(_engines);

var _browserDetective = require('browser-detective');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browser = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' ? (0, _browserDetective.detectBrowser)() : {};
console.info('BROWSER DETECTED\n', (0, _stringify2.default)(browser, null, 2));

function usePrintFrame(frame) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$engine = _ref.engine,
      engine = _ref$engine === undefined ? browser.engine || 'webkit' : _ref$engine,
      opts = (0, _objectWithoutProperties3.default)(_ref, ['engine']);

  if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== 'object') return;
  if (!frame) throw new Error('usePrintFrame must be provided the frame element.');
  var frameID = frame.getAttribute('id');
  if (!frameID) {
    frameID = 'content-frame';
    frame.setAttribute('id', frameID);
  }

  console.info('--engine--', engine);
  var useEngine = engines[engine];
  if (!useEngine) throw new Error('Unknown engine \'' + engine + '\'!');

  var _useEngine = useEngine(frame, opts),
      preprint = _useEngine.preprint,
      postprint = _useEngine.postprint,
      dispose = _useEngine.dispose;

  (0, _onPrint2.default)({ preprint: preprint, postprint: postprint });
  return dispose;
}