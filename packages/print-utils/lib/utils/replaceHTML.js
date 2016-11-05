'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.default = replaceNode;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const sourceClone = sourceElement.cloneNode(true)
//const [ sourceHTML, targetHTML ] = [ sourceClone.innerHTML, targetElement.innerHTML ]

function replaceNode(sourceElement, targetElement) {
  (0, _invariant2.default)(sourceElement, 'sourceElement must be defined');
  (0, _invariant2.default)(targetElement, 'targetElement must be defined');

  var targetNodes = (0, _from2.default)(targetElement.childNodes);

  // create a document fragment to store the content
  //const sourceClone = sourceElement.cloneNode(true)
  /*
  for(let sourceNode of Array.from(sourceElement.childNodes)) {
    fragment.appendChild(sourceNode.clone(true))
  }
  */
  // Add the hidden node to the end of the content so we can restore it later and bypass frames reloading

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _from2.default)(sourceElement.childNodes)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var sourceNode = _step.value;

      targetElement.appendChild(sourceNode.clone(true));
    }

    // create a hidden node and move the targets current content into it
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

  var restoreNode = document.createElement('div');
  restoreNode.style.setProperty('display', 'none', 'important');
  targetElement.appendChild(restoreNode);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(targetNodes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var targetNode = _step2.value;

      restoreNode.appendChild(targetNode);
    }
    //targetElement.appendChild(restoreNode)

    //sourceClone.appendChild(restoreNode)

    // replace the target element node with the fragment
    /*
    const parentNode = targetElement.parentNode
    parentNode.replaceChild(fragment, targetElement)
    */
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

  return function restoreNode() {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = (0, _getIterator3.default)((0, _from2.default)(restoreNode.childNodes)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var targetNode = _step3.value;

        targetElement.appendChild(targetNode);
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

    targetElement.removeChild(restoreNode);
    //parentNode.replaceChild(targetElement, sourceClone)
  };
}

/*

var elems = [
document.createElement(“hr”),
text( document.createElement(“b”), “Links:” ),
document.createTextNode(” “),
text( document.createElement(“a”), “Link A” ),
document.createTextNode(” | “),
text( document.createElement(“a”), “Link B” ),
document.createTextNode(” | “),
text( document.createElement(“a”), “Link C” )
]

function text(node, txt) {
  node.appendChild( document.createTextNode(txt) )
  return node
}


var divs = Array.from(document.getElementsByTagName(“div”))

// traditional
for ( let div of divs ) {
  for ( let elem of elems ) {
    div.appendChild( elem.cloneNode(true) )
  }
}

// fragment
var fragment = document.createDocumentFragment()

for ( let elem of elems ) {
  fragment.appendChild(elem)
}
for ( let div of divs ) {
  div.appendChild( fragment.cloneNode(true) )
}
*/