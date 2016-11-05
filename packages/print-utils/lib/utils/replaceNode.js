'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _setStyles = require('./setStyles');

var _setStyles2 = _interopRequireDefault(_setStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceNode = function () {
  return function (sourceNode, targetNode) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$sloppy = _ref.sloppy,
        sloppy = _ref$sloppy === undefined ? false : _ref$sloppy;

    (0, _invariant2.default)(sourceNode, 'sourceElement must be defined');
    (0, _invariant2.default)(targetNode, 'targetElement must be defined');

    var external = sourceNode.ownerDocument !== targetNode.ownerDocument;
    console.info('--replaceNode-- external? ' + external);

    var undos = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)((0, _from2.default)(document.getElementsByTagName('iframe'))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _iframe$style;

        var iframe = _step.value;

        var oldDisplay = [iframe.style.getPropertyValue('display'), targetNode.style.getPropertyPriority('display')];
        (_iframe$style = iframe.style).setProperty.apply(_iframe$style, ['display'].concat(oldDisplay));
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

    if (sloppy) {
      var startTime = performance.now();
      var oldHTML = targetNode.innerHTML;
      targetNode.innerHTML = sourceNode.innerHTML + '\n      <div id="__restore__" style="display:none !important; width: 0 !important; height: 0 !important;">' + oldHTML + '</div>';
      var endTime = performance.now();
      console.info('ELAPSED (SLOPPY)', endTime - startTime);
      return function restoreSloppy() {
        var restoreHTML = document.getElementById('__restore__').innerHTML;
        targetNode.innerHTML = restoreHTML;
      };
    } else {
      var _ret = function () {

        var startTime = performance.now();
        var hideNodes = (0, _from2.default)(targetNode.childNodes);
        var referenceNode = targetNode.childNodes[0];

        /*
        const oldHeight = [ targetNode.style.getPropertyValue('height'), targetNode.style.getPropertyPriority('height') ]
        const oldWidth = [ targetNode.style.getPropertyValue('width'), targetNode.style.getPropertyPriority('width') ]
        const oldDisplay = [ targetNode.style.getPropertyValue('display'), targetNode.style.getPropertyPriority('display') ]
        targetNode.style.setProperty('height', `${sourceNode.offsetHeight}px`, 'important')
        targetNode.style.setProperty('width', `${sourceNode.offsetWidth}px`, 'important')
        targetNode.style.setProperty('display', `inline-block`, 'important')
          undos.push(() => {
          targetNode.style.setProperty('height', ...oldHeight)
          targetNode.style.setProperty('width', ...oldWidth)
          targetNode.style.setProperty('display', ...oldDisplay)
        })
        */

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var node = _step2.value;

            if (node.nodeType !== Node.ELEMENT_NODE || node.nodeName === 'SCRIPT') return 'continue';
            var cloned = targetNode.insertBefore(external ? document.importNode(node, true) : node.cloneNode(true), referenceNode);
            undos.push(function () {
              return targetNode.removeChild(cloned);
            });
          };

          for (var _iterator2 = (0, _getIterator3.default)(sourceNode.childNodes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ret2 = _loop();

            if (_ret2 === 'continue') continue;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var sourceStyle = sourceNode.getAttribute('style');
        var targetStyle = targetNode.getAttribute('style');
        targetNode.setAttribute('style', sourceStyle);
        if (sourceStyle || targetStyle) undos.push(function () {
          return targetNode.setAttribute('style', targetStyle);
        });
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function _loop2() {
            var node = _step3.value;

            if (node.nodeType === Node.ELEMENT_NODE /*&& node.nodeName === 'IFRAME'*/) {
                (function () {
                  var oldStyle = [node.style.getPropertyValue('display'), node.style.getPropertyPriority('display')];
                  node.style.setProperty('display', 'none', 'important');
                  undos.push(function () {
                    var _node$style;

                    return (_node$style = node.style).setProperty.apply(_node$style, ['display'].concat(oldStyle));
                  });
                })();
              }
            /*
            } else {
            const removed = targetNode.removeChild(node)
            undos.push(() => targetNode.appendChild(removed)) //setStyles(node, { display: 'none !important'}))
            }
            */
          };

          for (var _iterator3 = (0, _getIterator3.default)(hideNodes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        var endTime = performance.now();
        console.info('ELAPSED (NOT SLOPPY)', endTime - startTime);
        return {
          v: function v() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = (0, _getIterator3.default)(undos), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var undo = _step4.value;

                undo();
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }
  };
}();

exports.default = replaceNode;