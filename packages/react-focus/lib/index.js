'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = reactFocus;

var _printUtils = require('print-utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function reactFocus(React) {
  var Component = React.Component;

  return function (_Component) {
    _inherits(Focus, _Component);

    function Focus(props) {
      _classCallCheck(this, Focus);

      var _this = _possibleConstructorReturn(this, (Focus.__proto__ || Object.getPrototypeOf(Focus)).call(this, props));

      _this.handleLoad = function () {};
      return _this;
    }

    _createClass(Focus, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.disposePrintFrame = (0, _printUtils.usePrintFrame)(this.frame);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.disposePrintFrame();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            className = _props.className,
            style = _props.style,
            url = _props.url,
            props = _objectWithoutProperties(_props, ['className', 'style', 'url']);

        return React.createElement(
          'div',
          { className: (0, _classnames2.default)('react-focus', className), style: style },
          React.createElement('iframe', _extends({}, props, {
            ref: function ref(x) {
              return _this2.frame = x;
            },
            onLoad: function onLoad() {
              return _this2.handleLoad.apply(_this2, arguments);
            },
            src: url,
            scrolling: 'no',
            width: '100%',
            height: '100%',
            frameBorder: '0',
            marginWidth: '0',
            marginHeight: '0',
            allowFullScreen: true,
            allowTransparency: true,
            seamless: true
          }))
        );
      }
    }]);

    return Focus;
  }(Component);
}