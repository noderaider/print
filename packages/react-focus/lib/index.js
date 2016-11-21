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

function getDocument(frame) {
  if (!frame) return null;
  if (!frame.contentDocument && !frame.contentWindow) return false;
  return frame.contentDocument || frame.contentWindow.document;
}

function reactFocus(React) {
  var Component = React.Component;

  return function (_Component) {
    _inherits(Focus, _Component);

    function Focus(props) {
      _classCallCheck(this, Focus);

      var _this = _possibleConstructorReturn(this, (Focus.__proto__ || Object.getPrototypeOf(Focus)).call(this, props));

      _this.handleLoad = function () {
        var frameBodyClassName = _this.props.frameBodyClassName;

        var frameDocument = getDocument(_this.frame);
        if (frameBodyClassName) {
          frameDocument.body.className = (0, _classnames2.default)(frameDocument.body.className, frameBodyClassName);
        }
      };
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
            src = _props.src,
            frameRef = _props.frameRef,
            frameClassName = _props.frameClassName,
            frameBodyClassName = _props.frameBodyClassName,
            onFrameLoad = _props.onFrameLoad,
            className = _props.className,
            props = _objectWithoutProperties(_props, ['src', 'frameRef', 'frameClassName', 'frameBodyClassName', 'onFrameLoad', 'className']);

        return React.createElement('iframe', _extends({}, props, {
          ref: function ref(x) {
            _this2.frame = x;
            if (frameRef) frameRef(x);
          },
          onLoad: function onLoad() {
            _this2.handleLoad.apply(_this2, arguments);
            if (onFrameLoad) onFrameLoad.apply(undefined, arguments);
          },
          className: (0, _classnames2.default)(frameClassName),
          src: src,
          scrolling: 'no',
          width: '100%',
          height: '100%',
          frameBorder: '0',
          marginWidth: '0',
          marginHeight: '0',
          allowFullScreen: true,
          allowTransparency: true,
          seamless: true
        }));
      }
    }]);

    return Focus;
  }(Component);
}