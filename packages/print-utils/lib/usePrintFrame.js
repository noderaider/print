'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = usePrintFrame;

var _onPrint = require('./onPrint');

var _onPrint2 = _interopRequireDefault(_onPrint);

var _parseCSSProperty2 = require('./utils/parseCSSProperty');

var _parseCSSProperty3 = _interopRequireDefault(_parseCSSProperty2);

var _serializeCSSProperty = require('./utils/serializeCSSProperty');

var _serializeCSSProperty2 = _interopRequireDefault(_serializeCSSProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
function usePrintFrame(frame) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$selectHeightElem = _ref.selectHeightElement,
      selectHeightElement = _ref$selectHeightElem === undefined ? function (doc) {
    return doc.querySelector('[data-iframe-height]') || doc.body;
  } : _ref$selectHeightElem,
      _ref$selectWidthEleme = _ref.selectWidthElement,
      selectWidthElement = _ref$selectWidthEleme === undefined ? function (doc) {
    return doc.querySelector('[data-iframe-width]') || doc.body;
  } : _ref$selectWidthEleme,
      _ref$selectContainerS = _ref.selectContainerStyle,
      selectContainerStyle = _ref$selectContainerS === undefined ? function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref2.doc,
        heightElement = _ref2.heightElement,
        widthElement = _ref2.widthElement;

    return { position: 'absolute !important',
      display: 'inline !important'
      /*
      , width: 'unset !important'
      , height: 'unset !important'
      */
      , width: scaleToWidth + 'px !important',
      height: '4000px !important' // `${descaleHeight(heightElement.offsetHeight, getScale(widthElement.offsetWidth))}px !important`
      //, height: '100% !important' //`${heightElement.offsetHeight}px !important`
      /*
      , zoom: `${getScale(widthElement.offsetWidth)} !important`
      */

      /*
      , 'min-width': 'unset !important'
      , 'min-height': 'unset !important'
      , 'max-width': 'unset !important'
      */
      //, 'max-height': '100vh !important'
      , top: '0px !important',
      left: '0px !important',
      right: '0px !important',
      margin: '0px 0px 0px 0px !important'
      //, bottom: '0px !important'
      , border: '0 !important'
      //, border: '0px !important'
      , overflow: 'visible !important'
    }
    /*
      , display: 'inline-block'
      , height: '100%'
      , width: '100%'
      */
    ;
  } : _ref$selectContainerS,
      _ref$selectFrameStyle = _ref.selectFrameStyle,
      selectFrameStyle = _ref$selectFrameStyle === undefined ? function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref3.doc,
        heightElement = _ref3.heightElement,
        widthElement = _ref3.widthElement;

    return { position: 'absolute !important',
      display: 'inline-block !important'
      /*
      , transform: `scale(${getScale(widthElement.offsetWidth)}) !important`
      , 'transform-origin': 'left top !important'
      */
      , visibility: 'visible !important',
      width: widthElement.offsetWidth + 'px !important',
      height: heightElement.offsetHeight + 'px !important',
      'min-height': '100% !important',
      transform: 'scale(' + getScale(widthElement.offsetWidth) + ') !important',
      'transform-origin': 'left top !important'
      /*
      , 'min-width': 'unset !important'
      , 'min-height': 'unset !important'
      , 'max-width': 'unset !important'
      , 'max-height': 'unset !important'
      */
      , top: '0px !important',
      bottom: '0px !important',
      left: '0px !important',
      right: '0px !important',
      border: '0 !important'
      //, border: '0px !important'
      , margin: '0px !important',
      padding: '0px !important',
      'padding-top': '0px !important',
      'padding-bottom': '0px !important',
      overflow: 'auto !important',
      'box-shadow': 'none !important',
      'background-color': 'transparent !important',
      'border-radius': '0 !important'
    };
    /*
    , 'min-height': `${heightElement.offsetHeight}px !important`
    , 'min-width': `${widthElement.offsetWidth}px !important`
    */
    /*
    .print-target {
    display: inline-block;
    /* position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    overflow: visible;
    height: 100% !important;
    width: 1500px;
    border:none;position:absolute;width:0px;height:0px;bottom:0px;left:0px;
    */
  } : _ref$selectFrameStyle,
      _ref$selectHeightElem2 = _ref.selectHeightElementStyle,
      selectHeightElementStyle = _ref$selectHeightElem2 === undefined ? function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref4.doc,
        heightElement = _ref4.heightElement,
        widthElement = _ref4.widthElement;

    return {};
  } : _ref$selectHeightElem2,
      _ref$selectWidthEleme2 = _ref.selectWidthElementStyle,
      selectWidthElementStyle = _ref$selectWidthEleme2 === undefined ? function () {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref5.doc,
        heightElement = _ref5.heightElement,
        widthElement = _ref5.widthElement;

    return {};
  } : _ref$selectWidthEleme2,
      _ref$selectFrameBodyS = _ref.selectFrameBodyStyle,
      selectFrameBodyStyle = _ref$selectFrameBodyS === undefined ? function () {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref6.doc,
        heightElement = _ref6.heightElement,
        widthElement = _ref6.widthElement;

    return { margin: '0px !important'
      //, 'margin-right': '40px !important'
      , padding: '0px !important'
      //, 'padding-right': '30px !important'
      , 'padding-top': '0px !important',
      'padding-bottom': '0px !important',
      'position': 'fixed !important',
      top: '0px !important',
      bottom: '0px !important',
      left: '0px !important',
      right: '0px !important',
      overflow: 'visible !important'
    };
  } : _ref$selectFrameBodyS,
      _ref$selectAncestorSt = _ref.selectAncestorStyle,
      selectAncestorStyle = _ref$selectAncestorSt === undefined ? function () {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref7.doc,
        heightElement = _ref7.heightElement,
        widthElement = _ref7.widthElement;

    return { display: 'inline-block !important',
      position: 'static !important',
      overflow: 'visible !important'
    };
  } : _ref$selectAncestorSt,
      _ref$topPrintCSS = _ref.topPrintCSS,
      topPrintCSS = _ref$topPrintCSS === undefined ? '\n* {\n  overflow: visible !important;\n}\nbody * {\n  display: none !important;\n  position: unset !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  width: 0 !important;\n}\n' : _ref$topPrintCSS,
      _ref$framePrintCSS = _ref.framePrintCSS,
      framePrintCSS = _ref$framePrintCSS === undefined ? '' : _ref$framePrintCSS;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (!frame) throw new Error('usePrintFrame must be provided the frame element.');

  var undoTopCSS = topPrintCSS ? setPrintCSS(document, topPrintCSS) : function () {};
  var undoFrameCSS = framePrintCSS ? setPrintCSS(resolveDocument(frame), framePrintCSS) : function () {};

  //setStyles(document.body, { border: '1px dashed red !important' })

  //const undoPrelimFrameStyle = setStyles(frame, { 'will-change': 'position display width height min-width min-height max-width max-height !important' })

  var undos = new Set();
  var disposePrint = (0, _onPrint2.default)({
    preprint: function preprint() {
      var _selectNodes = selectNodes(frame),
          container = _selectNodes.container,
          doc = _selectNodes.doc,
          ancestors = _selectNodes.ancestors;

      frame.setAttribute('width', '0');
      frame.setAttribute('height', '0');
      frame.contentWindow.focus();

      var i = doc.createElement('input');
      i.style.display = 'none';
      doc.body.appendChild(i);
      i.focus();
      doc.body.removeChild(i);

      if (!doc) throw new Error('Could not find doc in frame.');

      var heightElement = selectHeightElement(doc);
      var widthElement = selectWidthElement(doc);
      if (!heightElement) throw new Error('Could not find height element in frame.');
      if (!widthElement) throw new Error('Could not find width element in frame.');

      var containerStyle = selectContainerStyle({ doc: doc, heightElement: heightElement, widthElement: widthElement });
      var frameStyle = selectFrameStyle({ doc: doc, heightElement: heightElement, widthElement: widthElement });
      var frameBodyStyle = selectFrameBodyStyle({ doc: doc, heightElement: heightElement, widthElement: widthElement });
      var heightElementStyle = selectHeightElementStyle({ doc: doc, heightElement: heightElement, widthElement: widthElement });
      var widthElementStyle = selectWidthElementStyle({ doc: doc, heightElement: heightElement, widthElement: widthElement });
      var ancestorStyle = selectAncestorStyle({ doc: doc, heightElement: heightElement, widthElement: widthElement });

      undos = new Set([setStyles(container, containerStyle), setStyles(frame, frameStyle), setStyles(heightElement, heightElementStyle), setStyles(widthElement, widthElementStyle), setStyles(doc.body, frameBodyStyle)].concat(_toConsumableArray(ancestors.map(function (ancestor) {
        return setStyles(ancestor, ancestorStyle);
      }))));
      console.log('--preprint--', undos.size);
    },
    postprint: function postprint() {
      console.log('--postprint--', undos.size);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = undos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var undo = _step.value;

          undo();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      undos.clear();
    }
  });

  return function dispose() {
    undoTopCSS();
    undoFrameCSS();
    undoStyles();
  };
}

function selectNodes(frame) {
  var container = frame.parentNode;
  var doc = resolveDocument(frame);

  var ancestors = [];
  var current = container;
  while (current.parentNode) {
    current = current.parentNode;
    if (current.style) ancestors.push(current);
  }
  return { container: container, doc: doc, ancestors: ancestors };
}

/*
overflow: hidden; min-width: 990px; height: 385px; width: 990px;
overflow: hidden; min-width: 377px !important; height: 385px; width: 990px; position: fixed !important; display: inline-block !important; min-height: 286px !important;
overflow: hidden; min-width: 990px !important; height: 385px; width: 990px;
*/

function resolveDocument(obj) {
  if (obj.contentDocument) return obj.contentDocument;else if (obj.contentWindow) return obj.contentWindow.contentDocument;else if (obj.document) return obj.document;
  throw new Error('resolveDocument found no document object');
}

var stylesID = 'use-print-frame-styles';
function setPrintCSS(doc, css) {
  if (doc.getElementById(stylesID)) throw new Error('setPrintCSS should not be registered twice on the same document - call undoPrintCSS first.');
  var styleElement = doc.createElement('style');
  styleElement.setAttribute('id', stylesID);
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('media', 'print');
  styleElement.innerHTML = css;
  doc.head.appendChild(styleElement);
  return function undoPrintCSS() {
    doc.head.removeChild(styleElement);
  };
}

function setStyles(element, styles) {
  var prevStyles = Object.entries(styles).reduce(function (prev, _ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        key = _ref9[0],
        next = _ref9[1];

    var prop = { value: element.style.getPropertyValue(key), priority: element.style.getPropertyPriority(key) };
    console.info('SET STYLES', key, next, prop);
    var serialized = prop.value ? (0, _serializeCSSProperty2.default)(prop) : null;
    Object.defineProperty(prev, key, { value: serialized, enumerable: true });
    if (next) {
      var _parseCSSProperty = (0, _parseCSSProperty3.default)(next),
          value = _parseCSSProperty.value,
          priority = _parseCSSProperty.priority;

      element.style.setProperty(key, value, priority);
    } else {
      element.style.removeProperty(key);
    }
    return prev;
  }, {});
  return function undoStyles() {
    setStyles(element, prevStyles);
  };
}