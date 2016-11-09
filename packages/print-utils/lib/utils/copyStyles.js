'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copyStyles;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyStyles(sourceElement, targetElement) {
  var window = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : global;

  (0, _invariant2.default)(sourceElement, 'sourceElement is required');
  (0, _invariant2.default)(targetElement, 'targetElement is required');
  var sourceStyles = window.getComputedStyle(sourceElement);
  var undos = [];
  var sourceStyle = sourceElement.getAttribute('style');
  var targetStyle = targetElement.getAttribute('style');

  targetElement.setAttribute('style', sourceStyle);
  return function undoStyles() {
    targetElement.setAttribute('style', targetStyle);
  };
  /*
  const styleMap = Array.from(sourceStyles)
    .map((name) => [ name, sourceStyles.getPropertyValue(name), sourceStyles.getPropertyPriority(name) ])
    .filter(([ name, value ]) => typeof value === 'string' && value.length > 0 && value !== 'normal')
    .reduce((targetStyle, [ name, value, priority ]) => {
      const prevStyle = [ targetElement.style.getPropertyValue(name), targetElement.style.getPropertyPriority(name) ]
      undos.push(() => {
        console.info('ROLLING BACK STYLE', name, ...prevStyle)
        targetElement.style.setProperty(name, ...prevStyle)
      })
      targetStyle.setProperty(name, value, priority)
      return targetStyle
    }, targetElement.style)
  return () => {
    for(let undo of undos) {
      undo()
    }
  }
  */
}