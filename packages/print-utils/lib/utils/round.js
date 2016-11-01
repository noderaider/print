'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = round;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function round(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$digits = _ref.digits,
      digits = _ref$digits === undefined ? 2 : _ref$digits,
      _ref$down = _ref.down,
      down = _ref$down === undefined ? false : _ref$down,
      _ref$up = _ref.up,
      up = _ref$up === undefined ? false : _ref$up;

  (0, _invariant2.default)(down === false || up === false, 'down and up cannot both be true');
  (0, _invariant2.default)(digits, 'digits must be non-zero');
  var place = Math.pow(10, digits);
  var fn = Math[up ? 'ceil' : down ? 'floor' : 'round'];
  return fn(value * place) / place;
}