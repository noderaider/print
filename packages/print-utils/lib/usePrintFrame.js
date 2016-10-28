'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = usePrintFrame;

var _onPrint = require('./onPrint');

var _onPrint2 = _interopRequireDefault(_onPrint);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function usePrintFrame() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$selectFrame = _ref.selectFrame,
      selectFrame = _ref$selectFrame === undefined ? function (doc) {
    return doc.getElementById('content-frame');
  } : _ref$selectFrame,
      _ref$selectHeightElem = _ref.selectHeightElement,
      selectHeightElement = _ref$selectHeightElem === undefined ? function (doc) {
    return doc.querySelector('[data-iframe-height]') || doc.body;
  } : _ref$selectHeightElem,
      _ref$selectWidthEleme = _ref.selectWidthElement,
      selectWidthElement = _ref$selectWidthEleme === undefined ? function (doc) {
    return doc.querySelector('[data-iframe-width]') || doc.body;
  } : _ref$selectWidthEleme,
      _ref$selectContainerS = _ref.selectContainerStyle,
      selectContainerStyle = _ref$selectContainerS === undefined ? function (doc, heightElement, widthElement) {
    return (
      /*
        { position: 'fixed'
        , display: 'inline-block'
        , height: '100%'
        , width: '100%'
        */
      {}
    );
  } : _ref$selectContainerS,
      _ref$selectFrameStyle = _ref.selectFrameStyle,
      selectFrameStyle = _ref$selectFrameStyle === undefined ? function (doc, heightElement, widthElement) {
    return { position: 'fixed',
      display: 'inline-block',
      minHeight: heightElement.offsetHeight + 'px',
      minWidth: widthElement.offsetWidth + 'px'
    };
  } : _ref$selectFrameStyle,
      _ref$selectAncestorSt = _ref.selectAncestorStyle,
      selectAncestorStyle = _ref$selectAncestorSt === undefined ? function (doc, heightElement, widthElement) {
    return { display: 'inline-block',
      position: 'static'
    };
  } : _ref$selectAncestorSt,
      _ref$postDelay = _ref.postDelay,
      postDelay = _ref$postDelay === undefined ? 500 : _ref$postDelay;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;

  var stylesID = 'print-frame-styles';
  if (document.getElementById(stylesID)) throw new Error('usePrintFrame should not be registered twice - call dispose first.');

  var styleElement = document.createElement('style');
  styleElement.setAttribute('id', stylesID);
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('media', 'print');
  var styles = '\nbody * {\n  display: none !important;\n  position: static !important;\n  margin: 0 !important;\n}\n';
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
  var undoStyles = function undoStyles() {
    return document.head.removeChild(styleElement);
  };

  var undos = [];
  console.info('REGISTER ON PRINT');
  var disposePrint = (0, _onPrint2.default)({
    preprint: function preprint() {
      console.log('--PREPRINT--');

      var _selectNodes = selectNodes(selectFrame(document)),
          frame = _selectNodes.frame,
          container = _selectNodes.container,
          doc = _selectNodes.doc,
          ancestors = _selectNodes.ancestors;

      var heightElement = selectHeightElement(doc);
      var widthElement = selectWidthElement(doc);

      var containerStyle = selectContainerStyle(doc, heightElement, widthElement);
      var frameStyle = selectFrameStyle(doc, heightElement, widthElement);
      var ancestorStyle = selectAncestorStyle(doc, heightElement, widthElement);

      console.info('--preprint--');

      undos.push(setStyles(container, containerStyle));
      undos.push(setStyles(frame, frameStyle));
      undos.concat(ancestors.map(function (ancestor) {
        return setStyles(ancestor, ancestorStyle);
      }));
    },
    postprint: function postprint() {
      setTimeout(function () {
        while (undos.length > 0) {
          undos.pop()();
        }
      }, postDelay);
    }
  });

  return function dispose() {
    undoStyles();
    disposePrint();
  };
}

function selectNodes(frame) {
  var container = frame.parentNode;
  var doc = frame.contentDocument;

  var ancestors = [];
  var current = container;
  while (current.parentNode) {
    current = current.parentNode;
    if (current.style) ancestors.push(current);
  }
  return { frame: frame, container: container, doc: doc, ancestors: ancestors };
}

function setStyles(element, styles) {
  var prevStyles = Object.entries(styles).reduce(function (prev, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        next = _ref3[1];

    prev[key] = element.style[key];
    if (next) element.style.setProperty(key, next, 'important');else element.style.removeProperty(key);
    return prev;
  }, {});
  return function undoStyles() {
    setStyles(element, prevStyles);
  };
}