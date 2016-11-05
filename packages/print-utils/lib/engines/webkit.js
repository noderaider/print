'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

exports.default = webkit;

var _utils = require('../utils');

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function webkit(frame
//TODO TEST WITHOUT data-iframe-height and data-iframe-width
) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$selectHeightElem = _ref.selectHeightElement,
      selectHeightElement = _ref$selectHeightElem === undefined ? function (frameDocument) {
    return frameDocument.querySelector('[data-iframe-height]') || frameDocument.body;
  } : _ref$selectHeightElem,
      _ref$selectWidthEleme = _ref.selectWidthElement,
      selectWidthElement = _ref$selectWidthEleme === undefined ? function (frameDocument) {
    return frameDocument.querySelector('[data-iframe-width]') || frameDocument.body;
  } : _ref$selectWidthEleme,
      _ref$selectContainerS = _ref.selectContainerStyle,
      selectContainerStyle = _ref$selectContainerS === undefined ? function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref2.frameDocument,
        heightElement = _ref2.heightElement,
        widthElement = _ref2.widthElement;

    return { position: 'absolute !important',
      'z-index': '99999'
    };
  } : _ref$selectContainerS,
      _ref$selectFrameStyle = _ref.selectFrameStyle,
      selectFrameStyle = _ref$selectFrameStyle === undefined ? function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref3.frameDocument,
        heightElement = _ref3.heightElement,
        widthElement = _ref3.widthElement;

    return { 'height': heightElement.offsetHeight + 'px !important',
      width: '1107px !important',
      position: 'absolute !important',
      'z-index': '99999',
      display: 'block !important',
      top: '0 !important',
      left: '0 !important'
    };
  } : _ref$selectFrameStyle,
      _ref$selectBodyStyle = _ref.selectBodyStyle,
      selectBodyStyle = _ref$selectBodyStyle === undefined ? function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref4.frameDocument,
        heightElement = _ref4.heightElement,
        widthElement = _ref4.widthElement;

    return { display: 'inline-block !important',
      width: '1107px !important',
      height: heightElement.offsetHeight + 'px !important',
      overflow: 'visible !important'
    };
  } : _ref$selectBodyStyle,
      _ref$selectAncestorSt = _ref.selectAncestorStyle,
      selectAncestorStyle = _ref$selectAncestorSt === undefined ? function () {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref5.frameDocument,
        heightElement = _ref5.heightElement,
        widthElement = _ref5.widthElement;

    return { display: 'inline-block !important',
      width: '1107px !important',
      'max-width': '1107px !important',
      height: heightElement.offsetHeight + 'px !important',
      overflow: 'visible !important'
    };
  } : _ref$selectAncestorSt,
      _ref$selectTopPrintCS = _ref.selectTopPrintCSS,
      selectTopPrintCSS = _ref$selectTopPrintCS === undefined ? function (_ref6) {
    var frameDocument = _ref6.frameDocument,
        heightElement = _ref6.heightElement,
        widthElement = _ref6.widthElement,
        frameID = _ref6.frameID;


    var topPrintCSS = '\n* {\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  display: none !important;\n  float: none !important;\n  /*\n  box-sizing: border-box;\n  min-height: 0;\n  min-width: 0;\n  width: 0;\n  height: 0;\n  */\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n}\nbody {\n  height: ' + heightElement.offsetHeight + 'px !important;\n}\n.react-focus {\n  display: inline-block !important;\n  /* transform-origin: top left !important; */\n  /* position: relative !important; */\n  top: 0 !important;\n  left: 0 !important;\n  /* right: 0 !important; */\n  border: 0 !important;\n  overflow: visible !important;\n  /*\n  height: ' + heightElement.offsetHeight + 'px !important;\n  */\n  width: 1107px !important;\n}\niframe#' + frameID + ' {\n  width: 100%;\n  max-width: 1107px !important;\n  /*\n\n   height: ' + heightElement.offsetHeight + 'px !important;\n  */\n  transform-origin: top left !important;\n  position: relative !important;\n  display: inline-block !important;\n  border: 0 !important;\n  top: 0 !important;\n  left: 0 !important;\n  /*\n  right: 0 !important;\n  */\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: visible !important;\n  will-change: height width;\n}\n';
    //undoWidthStyle()
    return topPrintCSS;
  } : _ref$selectTopPrintCS,
      _ref$selectFramePrint = _ref.selectFramePrintCSS,
      selectFramePrintCSS = _ref$selectFramePrint === undefined ? function (_ref7) {
    var frameDocument = _ref7.frameDocument,
        heightElement = _ref7.heightElement,
        widthElement = _ref7.widthElement;

    return '\n* {\n  float: none !important;\n\n}\nbody {\n  display: block !important;\n  max-width: 1107px !important;\n}\n';
  } : _ref$selectFramePrint,
      _ref$selectMaxWidth = _ref.selectMaxWidth,
      selectMaxWidth = _ref$selectMaxWidth === undefined ? function () {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0, _objectDestructuringEmpty3.default)(_ref8);

    return 1107;
  } : _ref$selectMaxWidth,
      _ref$selectPrintWidth = _ref.selectPrintWidth,
      selectPrintWidth = _ref$selectPrintWidth === undefined ? function () {
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0, _objectDestructuringEmpty3.default)(_ref9);

    return 1107;
  } : _ref$selectPrintWidth;

  var frameID = frame.getAttribute('id');

  var frameDocument = void 0;
  var undoTopPrintCSS = void 0;
  var undoFramePrintCSS = void 0;

  function calculateScale(_ref10) {
    var widthElement = _ref10.widthElement;

    var printWidth = selectPrintWidth();
    var topWidth = window.innerWidth;
    var frameWidth = frame.contentWindow.innerWidth;
    var container = frame.parentNode;
    if (container.offsetWidth === 0) container.style.setProperty('width', frameWidth + 'px', 'important');
    var containerWidth = container.offsetWidth || frameWidth;
    (0, _invariant2.default)(printWidth, 'printWidth must be a number greater than 0');
    (0, _invariant2.default)(topWidth, 'topWidth must be a number greater than 0');
    (0, _invariant2.default)(frameWidth, 'frameWidth must be a number greater than 0');
    (0, _invariant2.default)(containerWidth, 'containerWidth must be a number greater than 0');
    // the target page size relative to the top frame
    var pageScale = (0, _utils.round)((0, _utils.getScale)(printWidth, topWidth), { down: true });
    var containerScale = (0, _utils.round)((0, _utils.getScale)(printWidth, containerWidth), { down: true });
    // the top frame size relative to the iframe
    var frameScale = (0, _utils.round)((0, _utils.getScale)(printWidth, frameWidth), { down: true });
    var scale = (0, _utils.round)(pageScale * frameScale, { down: true });
    //const width = frame.contentWindow.innerWidth
    //const width = widthElement.offsetWidth
    var scaledWidth = printWidth; //roundDown(topWidth * pageScale, 1)
    console.info('--calculateScale--\nprintWidth: ' + printWidth + '\ntopWidth: ' + topWidth + '\nframeWidth: ' + frameWidth + '\nwidthElement: ' + widthElement.offsetWidth + '\npageScale: ' + pageScale + '\nframeScale: ' + frameScale + '\ncontainerScale: ' + containerScale + '\nscale: ' + scale + '\nscaledWidth: ' + scaledWidth);
    return { scale: scale, scaledWidth: scaledWidth, pageScale: pageScale, frameScale: frameScale, containerScale: containerScale };
  }

  function setPrintStyles() {
    frameDocument = (0, _utils.resolveDocument)(frame);
    var heightElement = selectHeightElement(frameDocument);
    var widthElement = selectWidthElement(frameDocument);
    var topPrintCSS = selectTopPrintCSS({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement, frameID: frameID });
    var framePrintCSS = selectFramePrintCSS({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });
    var printWidth = selectPrintWidth();
    //frame.setAttribute('width', pageWidth)
    //setStyles(frame, { 'max-width': `${printWidth}px !important` })

    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoFramePrintCSS) undoFramePrintCSS();
    undoTopPrintCSS = topPrintCSS ? (0, _utils.setCSS)(document, topPrintCSS, 'print', { id: 'top-css' }) : function () {};
    undoFramePrintCSS = framePrintCSS ? (0, _utils.setCSS)(frameDocument, framePrintCSS, 'print', { id: 'frame-css' }) : function () {};
  }

  var containerClassName = void 0;
  frame.addEventListener('load', function () {
    setPrintStyles();

    var _selectAncestors = selectAncestors(frame),
        container = _selectAncestors.container,
        ancestors = _selectAncestors.ancestors;

    containerClassName = container.className;
    container.className = (0, _classnames2.default)(container.className, 'react-focus');
  });
  var undos = new _set2.default();

  // FINDINGS
  // DOES NOT UNDERSTAND WIDTH CHANGES INSIDE
  function preprint() {
    frameDocument = (0, _utils.resolveDocument)(frame);
    var undoFrameBodyStyles = (0, _utils.setStyles)(frameDocument.body, { 'width': 1100 + 'px !important', overflow: 'visible !important' });
    var printWidth = selectPrintWidth();

    var _selectAncestors2 = selectAncestors(frame),
        container = _selectAncestors2.container,
        ancestors = _selectAncestors2.ancestors;

    //frame.setAttribute('width', 1107)


    frame.contentWindow.focus();

    (0, _invariant2.default)(frameDocument, 'Could not find document in frame');

    var heightElement = selectHeightElement(frameDocument);
    var widthElement = selectWidthElement(frameDocument);
    (0, _invariant2.default)(heightElement, 'DOM element must be returned from selectHeightElement');
    (0, _invariant2.default)(widthElement, 'DOM element must be returned from selectWidthElement');

    var opts = { frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement };

    var containerStyle = selectContainerStyle(opts);
    var frameStyle = selectFrameStyle(opts);
    var bodyStyle = selectBodyStyle(opts);
    var ancestorStyle = selectAncestorStyle(opts);

    //const { scale, scaledWidth, frameScale, pageScale, containerScale } = calculateScale ({ widthElement })


    undos = new _set2.default([undoFrameBodyStyles, (0, _utils.setStyles)(document.body, bodyStyle)
    //, setStyles(container, containerStyle)
    //, setStyles(container, { transform: `scale(${containerScale}) !important` })
    , (0, _utils.setStyles)(container, { width: '1107px !important', height: heightElement.offsetHeight + 'px !important', overflow: 'visible !important' }), (0, _utils.setStyles)(frame, frameStyle), (0, _utils.setStyles)(frame, { /* transform: `scale(${frameScale}) !important`, */overflow: 'visible !important' })

    //, setStyles(frame, { transform: `scale(${frameScale}) !important` })
    ].concat((0, _toConsumableArray3.default)(ancestors.map(function (ancestor) {
      return (0, _utils.setStyles)(ancestor, ancestorStyle);
    }))));
    console.log('--preprint--', undos.size);
  }

  function postprint() {
    console.log('--postprint--', undos.size);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(undos), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

  function dispose() {
    if (undoTopPrintCSS) undoTopPrintCSS();
    if (undoFramePrintCSS) undoFramePrintCSS();
  }

  return { preprint: preprint, postprint: postprint, dispose: dispose };
}

function selectAncestors(frame) {
  var container = frame.parentNode;
  var ancestors = [];
  var current = container;
  while (current.parentNode) {
    current = current.parentNode;
    if (current.style) ancestors.push(current);
  }
  return { container: container, ancestors: ancestors };
}