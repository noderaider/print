'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = reactRuler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reactRuler(React) {
  var Component = React.Component,
      PropTypes = React.PropTypes;


  return function (_Component) {
    (0, _inherits3.default)(Ruler, _Component);

    function Ruler() {
      (0, _classCallCheck3.default)(this, Ruler);
      return (0, _possibleConstructorReturn3.default)(this, (Ruler.__proto__ || (0, _getPrototypeOf2.default)(Ruler)).apply(this, arguments));
    }

    (0, _createClass3.default)(Ruler, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            orientation = _props.orientation,
            segments = _props.segments,
            segmentLength = _props.segmentLength,
            hide = _props.hide;

        var ruler = new Array(segments + 1).fill(0);
        return React.createElement(
          'div',
          null,
          ruler.map(function (x, i) {
            var _ref;

            var total = segmentLength * i;
            return React.createElement('div', {
              key: i,
              style: (_ref = { position: 'absolute',
                display: 'inline',
                boxSizing: 'border-box'
              }, (0, _defineProperty3.default)(_ref, orientation === 'horizontal' ? 'left' : 'top', total), (0, _defineProperty3.default)(_ref, orientation === 'horizontal' ? 'top' : 'left', 0), (0, _defineProperty3.default)(_ref, orientation === 'horizontal' ? 'height' : 'width', total % 100 === 0 ? 25 : i % 2 === 0 ? 10 : 5), (0, _defineProperty3.default)(_ref, orientation === 'horizontal' ? 'width' : 'height', 1), (0, _defineProperty3.default)(_ref, orientation === 'horizontal' ? 'borderLeft' : 'borderTop', '1px solid ' + (hide ? 'transparent' : total % 100 === 0 ? 'red' : 'blue')), _ref)
            });
          })
        );
      }
    }]);
    return Ruler;
  }(Component);
}