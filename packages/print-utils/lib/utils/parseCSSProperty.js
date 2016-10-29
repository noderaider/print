'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = parseCSSProperty;
var stripper = /^ *([0-9a-z\-\.()% ]*[0-9a-z\-\.()%])[ !]*([a-z]+)?/;

function parseCSSProperty(raw) {
  if (typeof raw !== 'string') throw new Error('parseCSSProperty expects a string CSS value input.');

  var _ref = stripper.exec(raw) || [],
      _ref2 = _slicedToArray(_ref, 3),
      match = _ref2[0],
      value = _ref2[1],
      _ref2$ = _ref2[2],
      priority = _ref2$ === undefined ? '' : _ref2$;

  if (!value) throw new Error('parseCSSProperty could not parse a property value from \'' + raw + '\'');
  return { value: value, priority: priority };
}