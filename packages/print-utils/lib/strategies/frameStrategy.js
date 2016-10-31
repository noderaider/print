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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function frameStrategy(frame) {
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

    return { height: heightElement.offsetHeight + 'px !important',
      width: '700px !important',
      display: 'inline-table !important',
      'overflow': 'scroll !important',
      top: '0 !important',
      left: '0 !important'
    };
  } : _ref$selectContainerS,
      _ref$selectFrameStyle = _ref.selectFrameStyle,
      selectFrameStyle = _ref$selectFrameStyle === undefined ? function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref3.doc,
        heightElement = _ref3.heightElement,
        widthElement = _ref3.widthElement;

    console.info('FRAME', widthElement.offsetWidth, heightElement.offsetHeight);
    return { height: heightElement.offsetHeight + 'px !important',
      width: '100% !important',
      display: 'inline-block !important',
      top: '0 !important',
      left: '0 !important'
    };
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

    return {};
  } : _ref$selectFrameBodyS,
      _ref$selectAncestorSt = _ref.selectAncestorStyle,
      selectAncestorStyle = _ref$selectAncestorSt === undefined ? function () {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref7.doc,
        heightElement = _ref7.heightElement,
        widthElement = _ref7.widthElement;

    return { display: 'inline-block !important'
    };
  } : _ref$selectAncestorSt;

  var topPrintCSS = '\n* {\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  min-height: 0 !important;\n  min-width: 0 !important;\n}\nbody, html {\n  margin: 0 !important;\n  padding: 0 !important;\n  //, \'min-height\': \'200vh !important\'\n}\nbody {\n  overflow: intitial !important;\n  /*\n  padding-right: 30px !important;\n  */\n}\nbody * {\n  display: none !important;\n}\n.react-focus {\n  /*\n  position: fixed !important;\n  */\n  display: block !important;\n  top: 0 !important;\n  /*\n  bottom: 0 !important;\n  */\n  left: 0 !important;\n  right: 0 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  /*\n  overflow: initial !important;\n  */\n}\niframe {\n  position: absolute !important;\n  display: block !important;\n  border: 0 !important;\n  /*\n  overflow: initial !important;\n  */\n  top: 0 !important;\n  /*\n  bottom: 0 !important;\n  */\n  left: 0 !important;\n  right: 0 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n';
  var framePrintCSS = '\n* {\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n  min-height: 0 !important;\n  min-width: 0 !important;\n}\nh1 {\n  padding: 0 !important;\n  margin: 0 !important;\n}\nbody,\nbody * {\n  /*\n  overflow: initial !important;\n  */\n}\n  ';

  var undoTopCSS = topPrintCSS ? (0, _utils.setPrintCSS)(document, topPrintCSS) : function () {};
  var frameDocument = void 0;
  var undoFrameCSS = void 0;
  if (framePrintCSS && frame.contentWindow) {
    frameDocument = (0, _utils.resolveDocument)(frame);
    undoFrameCSS = (0, _utils.setPrintCSS)(frameDocument, framePrintCSS);
  }
  frame.addEventListener('load', function () {
    frameDocument = (0, _utils.resolveDocument)(frame);
    console.info('LOADED FRAME', frameDocument);
    undoFrameCSS = framePrintCSS ? (0, _utils.setPrintCSS)(frameDocument, framePrintCSS) : function () {};
    //const heightElement = selectHeightElement(frameDocument)
    //frame.setAttribute('style', `height: ${heightElement.offsetHeight}px !important; min-height: ${heightElement.offsetHeight}px !important;`)
  });
  var undos = new _set2.default();

  function preprint() {
    frame.contentWindow.focus();
    console.info('PREprint');

    var _selectNodes = selectNodes(frame),
        container = _selectNodes.container,
        doc = _selectNodes.doc,
        ancestors = _selectNodes.ancestors;
    /*
    frame.setAttribute('width', '0')
    frame.setAttribute('height', '0')
    */

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

    undos = new _set2.default([(0, _utils.setStyles)(container, containerStyle), (0, _utils.setStyles)(frame, frameStyle), (0, _utils.setStyles)(heightElement, heightElementStyle), (0, _utils.setStyles)(widthElement, widthElementStyle), (0, _utils.setStyles)(doc.body, frameBodyStyle)].concat((0, _toConsumableArray3.default)(ancestors.map(function (ancestor) {
      return (0, _utils.setStyles)(ancestor, ancestorStyle);
    }))));
    console.log('--preprint--', undos.size);
  }

  function postprint() {
    console.info('POSTprint');
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
    undoTopCSS();
    undoFrameCSS();
    undoStyles();
  }

  return { preprint: preprint, postprint: postprint, dispose: dispose };
}

function selectNodes(frame) {
  var container = frame.parentNode;
  var doc = (0, _utils.resolveDocument)(frame);

  var ancestors = [];
  var current = container;
  while (current.parentNode) {
    current = current.parentNode;
    if (current.style) ancestors.push(current);
  }
  return { container: container, doc: doc, ancestors: ancestors };
}