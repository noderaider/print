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

exports.default = frameStrategy;

var _utils = require('../utils');

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function frameStrategy(frame) {
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

    return {} //'font-size': '12px !important'

    /*
        { height: `${heightElement.offsetHeight}px !important`
        , width: '700px !important'
        , display: 'inline-table !important'
        , 'overflow': 'scroll !important'
        , top: '0 !important'
        , left: '0 !important'
        }
        */
    ;
  } : _ref$selectContainerS,
      _ref$selectFrameStyle = _ref.selectFrameStyle,
      selectFrameStyle = _ref$selectFrameStyle === undefined ? function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref3.frameDocument,
        heightElement = _ref3.heightElement,
        widthElement = _ref3.widthElement;

    return (
      /*
      { visibility: 'visible !important'
      , position: 'fixed !important'
      , right: '0 !important'
      , bottom: '0 !important'
      }
      */
      { 'height': heightElement.offsetHeight + 'px !important'
        //, 'width': `${widthElement.offsetWidth}px !important`
        //, width: '100% !important'
        , display: 'inline-block !important',
        top: '0 !important',
        left: '0 !important'
        //, position: 'absolute !important'
        //, 'font-size': '10px !important'
      }
    );
  } : _ref$selectFrameStyle,
      _ref$selectBodyStyle = _ref.selectBodyStyle,
      selectBodyStyle = _ref$selectBodyStyle === undefined ? function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref4.frameDocument,
        heightElement = _ref4.heightElement,
        widthElement = _ref4.widthElement;

    return (
      //{ height: `${1.5 * heightElement.offsetHeight}px !important`
      {}
    );
  } : _ref$selectBodyStyle,
      _ref$selectAncestorSt = _ref.selectAncestorStyle,
      selectAncestorStyle = _ref$selectAncestorSt === undefined ? function () {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        frameDocument = _ref5.frameDocument,
        heightElement = _ref5.heightElement,
        widthElement = _ref5.widthElement;

    return { display: 'inline-block !important'
    };
  } : _ref$selectAncestorSt,
      _ref$selectTopPrintCS = _ref.selectTopPrintCSS,
      selectTopPrintCSS = _ref$selectTopPrintCS === undefined ? function (_ref6) {
    var frameDocument = _ref6.frameDocument,
        heightElement = _ref6.heightElement,
        widthElement = _ref6.widthElement;


    //const undoWidthStyle = setStyles(heightElement, { width: '100vw !important' })
    var topPrintCSS = '\n* {\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  min-height: 0 !important;\n  min-width: 0 !important;\n  display: none !important;\n  float: none !important;\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n  display: inline-block !important;\n}\nbody {\n  height: ' + heightElement.offsetHeight + 'px !important;\n}\n.react-focus {\n  display: inline !important;\n  position: absolute !important;\n  width: 100vw !important;\n  border: 0 !important;\n  overflow: visible !important;\n}\niframe {\n  /*\n\n   height: ' + heightElement.offsetHeight + 'px !important;\n  */\n  position: relative !important;\n  display: inline-block !important;\n  border: 0 !important;\n  top: 0 !important;\n  left: 0 !important;\n  /*\n  right: 0 !important;\n  */\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: visible !important;\n  will-change: height;\n}\n';
    //undoWidthStyle()
    return topPrintCSS;
  } : _ref$selectTopPrintCS,
      _ref$selectFramePrint = _ref.selectFramePrintCSS,
      selectFramePrintCSS = _ref$selectFramePrint === undefined ? function (_ref7) {
    var frameDocument = _ref7.frameDocument,
        heightElement = _ref7.heightElement,
        widthElement = _ref7.widthElement;

    return '\nbody {\n  display: block !important;\n}\n';
  } : _ref$selectFramePrint;

  var frameDocument = void 0;
  var undoTopPrintCSS = void 0;
  var undoFramePrintCSS = void 0;
  frame.addEventListener('load', function () {
    frameDocument = (0, _utils.resolveDocument)(frame);
    var heightElement = selectHeightElement(frameDocument);
    var widthElement = selectWidthElement(frameDocument);
    var topPrintCSS = selectTopPrintCSS({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });
    var framePrintCSS = selectFramePrintCSS({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });
    undoTopPrintCSS = topPrintCSS ? (0, _utils.setCSS)(document, topPrintCSS, 'print') : function () {};
    undoFramePrintCSS = framePrintCSS ? (0, _utils.setCSS)(frameDocument, framePrintCSS, 'print') : function () {};
  });
  var undos = new _set2.default();

  //let _bodyClassName

  function preprint() {
    frameDocument = (0, _utils.resolveDocument)(frame);
    //_bodyClassName = frameDocument.body.className
    //frameDocument.body.className = 'use-print-frame'

    var _selectAncestors = selectAncestors(frame),
        container = _selectAncestors.container,
        ancestors = _selectAncestors.ancestors;

    frame.contentWindow.focus();

    if (!frameDocument) throw new Error('Could not find document in frame.');

    var heightElement = selectHeightElement(frameDocument);
    var widthElement = selectWidthElement(frameDocument);
    if (!heightElement) throw new Error('Could not find height element in frame.');
    if (!widthElement) throw new Error('Could not find width element in frame.');

    var containerStyle = selectContainerStyle({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });
    var frameStyle = selectFrameStyle({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });
    var bodyStyle = selectBodyStyle({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });
    var ancestorStyle = selectAncestorStyle({ frameDocument: frameDocument, heightElement: heightElement, widthElement: widthElement });

    undos = new _set2.default([(0, _utils.setStyles)(document.body, bodyStyle), (0, _utils.setStyles)(container, containerStyle), (0, _utils.setStyles)(frame, frameStyle)].concat((0, _toConsumableArray3.default)(ancestors.map(function (ancestor) {
      return (0, _utils.setStyles)(ancestor, ancestorStyle);
    }))));
    console.log('--preprint--', undos.size);
  }

  function postprint() {
    //frameDocument.body.className = _bodyClassName
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
    if (undoStyles) undoStyles();
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