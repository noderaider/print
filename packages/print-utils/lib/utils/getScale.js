"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScale;
function roundDown(num) {
  return Math.floor(num * 100) / 100;
}

function getScale(outerWidth, innerWidth) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$maximum = _ref.maximum,
      maximum = _ref$maximum === undefined ? 1 : _ref$maximum;

  var rawScale = outerWidth / innerWidth;
  return rawScale;
  return rawScale > maximum ? maximum : rawScale;
}

function descaleHeight(height, scaleFactor) {
  return height * scaleFactor;
}