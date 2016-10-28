(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('util')) :
  typeof define === 'function' && define.amd ? define(['exports', 'util'], factory) :
  (factory((global.printutils = global.printutils || {}),global.util));
}(this, (function (exports,util) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function onPrint() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      preprint = _ref.preprint,
      postprint = _ref.postprint;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    console.info('onPrint => STRATEGY 1');
    if (preprint) window.onbeforeprint = preprint;
    if (postprint) window.onafterprint = postprint;
    return function dispose() {
      if (preprint) window.onbeforeprint = null;
      if (postprint) window.onafterprint = null;
    };
  } else if (preprint || postprint) {
    var _ret = function () {
      var mqlListener = function mqlListener(mql) {
        if (mql.matches && preprint) preprint();else if (!mql.matches && postprint) postprint();
      };

      console.info('onPrint => STRATEGY 2');

      var mql = window.matchMedia('print');
      mql.addListener(mqlListener);
      return {
        v: function disposeMedia() {
          console.info('DISPOSING STRATEGY 2');
          mql.removeListener(mqlListener);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    console.info('onPrint => STRATEGY 3');
    return function () {};
  }
}

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
  var disposePrint = onPrint({
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
    var _ref3 = slicedToArray(_ref2, 2),
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

exports.onPrint = onPrint;
exports.usePrintFrame = usePrintFrame;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9vblByaW50LmpzIiwiLi4vc3JjL3VzZVByaW50RnJhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25QcmludCh7IHByZXByaW50LCBwb3N0cHJpbnQgfSA9IHt9KSB7XHJcbiAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcpXHJcbiAgICByZXR1cm5cclxuICBpZih3aW5kb3cub25iZWZvcmVwcmludCAhPT0gdW5kZWZpbmVkICYmIHdpbmRvdy5vbmFmdGVycHJpbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc29sZS5pbmZvKCdvblByaW50ID0+IFNUUkFURUdZIDEnKVxyXG4gICAgaWYocHJlcHJpbnQpXHJcbiAgICAgIHdpbmRvdy5vbmJlZm9yZXByaW50ID0gcHJlcHJpbnRcclxuICAgIGlmKHBvc3RwcmludClcclxuICAgICAgd2luZG93Lm9uYWZ0ZXJwcmludCA9IHBvc3RwcmludFxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRpc3Bvc2UgKCkge1xyXG4gICAgICBpZihwcmVwcmludClcclxuICAgICAgICB3aW5kb3cub25iZWZvcmVwcmludCA9IG51bGxcclxuICAgICAgaWYocG9zdHByaW50KVxyXG4gICAgICAgIHdpbmRvdy5vbmFmdGVycHJpbnQgPSBudWxsXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmKHByZXByaW50IHx8IHBvc3RwcmludCkge1xyXG4gICAgY29uc29sZS5pbmZvKCdvblByaW50ID0+IFNUUkFURUdZIDInKVxyXG4gICAgZnVuY3Rpb24gbXFsTGlzdGVuZXIgKG1xbCkge1xyXG4gICAgICBpZihtcWwubWF0Y2hlcyAmJiBwcmVwcmludClcclxuICAgICAgICBwcmVwcmludCgpXHJcbiAgICAgIGVsc2UgaWYoIW1xbC5tYXRjaGVzICYmIHBvc3RwcmludClcclxuICAgICAgICBwb3N0cHJpbnQoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgbXFsID0gd2luZG93Lm1hdGNoTWVkaWEoJ3ByaW50JylcclxuICAgIG1xbC5hZGRMaXN0ZW5lcihtcWxMaXN0ZW5lcilcclxuICAgIHJldHVybiBmdW5jdGlvbiBkaXNwb3NlTWVkaWEgKCkge1xyXG4gICAgICBjb25zb2xlLmluZm8oJ0RJU1BPU0lORyBTVFJBVEVHWSAyJylcclxuICAgICAgbXFsLnJlbW92ZUxpc3RlbmVyKG1xbExpc3RlbmVyKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmluZm8oJ29uUHJpbnQgPT4gU1RSQVRFR1kgMycpXHJcbiAgICByZXR1cm4gKCkgPT4ge31cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IG9uUHJpbnQgZnJvbSAnLi9vblByaW50J1xyXG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlUHJpbnRGcmFtZShcclxuICB7IHNlbGVjdEZyYW1lID0gKGRvYykgPT4gZG9jLmdldEVsZW1lbnRCeUlkKCdjb250ZW50LWZyYW1lJylcclxuICAsIHNlbGVjdEhlaWdodEVsZW1lbnQgPSAoZG9jKSA9PiBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtaWZyYW1lLWhlaWdodF0nKSB8fCBkb2MuYm9keVxyXG4gICwgc2VsZWN0V2lkdGhFbGVtZW50ID0gKGRvYykgPT4gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlmcmFtZS13aWR0aF0nKSB8fCBkb2MuYm9keVxyXG4gICwgc2VsZWN0Q29udGFpbmVyU3R5bGUgPSAoZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQpID0+IChcclxuICAgIC8qXHJcbiAgICAgIHsgcG9zaXRpb246ICdmaXhlZCdcclxuICAgICAgLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAsIGhlaWdodDogJzEwMCUnXHJcbiAgICAgICwgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICAqL1xyXG4gICAgICB7fVxyXG4gICAgKVxyXG4gICwgc2VsZWN0RnJhbWVTdHlsZSA9IChkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCkgPT4gKFxyXG4gICAgICB7IHBvc2l0aW9uOiAnZml4ZWQnXHJcbiAgICAgICwgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgLCBtaW5IZWlnaHQ6IGAke2hlaWdodEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4YFxyXG4gICAgICAsIG1pbldpZHRoOiBgJHt3aWR0aEVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgXHJcbiAgICAgIH1cclxuICAgIClcclxuICAsIHNlbGVjdEFuY2VzdG9yU3R5bGUgPSAoZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQpID0+IChcclxuICAgICAgeyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAsIHBvc2l0aW9uOiAnc3RhdGljJ1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgLCBwb3N0RGVsYXkgPSA1MDBcclxuICB9ID0ge31cclxuKSB7XHJcbiAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcpXHJcbiAgICByZXR1cm5cclxuXHJcblxyXG4gIGNvbnN0IHN0eWxlc0lEID0gJ3ByaW50LWZyYW1lLXN0eWxlcydcclxuICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHlsZXNJRCkpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZVByaW50RnJhbWUgc2hvdWxkIG5vdCBiZSByZWdpc3RlcmVkIHR3aWNlIC0gY2FsbCBkaXNwb3NlIGZpcnN0LicpXHJcblxyXG5cclxuICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXHJcbiAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZXNJRClcclxuICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJylcclxuICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsICdwcmludCcpXHJcbiAgY29uc3Qgc3R5bGVzID0gYFxyXG5ib2R5ICoge1xyXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxuICBwb3NpdGlvbjogc3RhdGljICFpbXBvcnRhbnQ7XHJcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuYFxyXG4gIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBzdHlsZXNcclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcclxuICBjb25zdCB1bmRvU3R5bGVzID0gKCkgPT4gZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXHJcblxyXG4gIGNvbnN0IHVuZG9zID0gW11cclxuICBjb25zb2xlLmluZm8oJ1JFR0lTVEVSIE9OIFBSSU5UJylcclxuICBjb25zdCBkaXNwb3NlUHJpbnQgPSBvblByaW50KFxyXG4gICAgeyBwcmVwcmludCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnLS1QUkVQUklOVC0tJylcclxuICAgICAgICBjb25zdCB7IGZyYW1lLCBjb250YWluZXIsIGRvYywgYW5jZXN0b3JzIH0gPSBzZWxlY3ROb2RlcyhzZWxlY3RGcmFtZShkb2N1bWVudCkpXHJcblxyXG4gICAgICAgIGNvbnN0IGhlaWdodEVsZW1lbnQgPSBzZWxlY3RIZWlnaHRFbGVtZW50KGRvYylcclxuICAgICAgICBjb25zdCB3aWR0aEVsZW1lbnQgPSBzZWxlY3RXaWR0aEVsZW1lbnQoZG9jKVxyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJTdHlsZSA9IHNlbGVjdENvbnRhaW5lclN0eWxlKGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50KVxyXG4gICAgICAgIGNvbnN0IGZyYW1lU3R5bGUgPSBzZWxlY3RGcmFtZVN0eWxlKGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50KVxyXG4gICAgICAgIGNvbnN0IGFuY2VzdG9yU3R5bGUgPSBzZWxlY3RBbmNlc3RvclN0eWxlKGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50KVxyXG5cclxuICAgICAgICBjb25zb2xlLmluZm8oJy0tcHJlcHJpbnQtLScpXHJcblxyXG4gICAgICAgIHVuZG9zLnB1c2goc2V0U3R5bGVzKGNvbnRhaW5lciwgY29udGFpbmVyU3R5bGUpKVxyXG4gICAgICAgIHVuZG9zLnB1c2goc2V0U3R5bGVzKGZyYW1lLCBmcmFtZVN0eWxlKSlcclxuICAgICAgICB1bmRvcy5jb25jYXQoYW5jZXN0b3JzLm1hcCgoYW5jZXN0b3IpID0+IHNldFN0eWxlcyhhbmNlc3RvciwgYW5jZXN0b3JTdHlsZSkpKVxyXG4gICAgICB9XHJcbiAgICAsIHBvc3RwcmludCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHdoaWxlKHVuZG9zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgKHVuZG9zLnBvcCgpKSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgcG9zdERlbGF5KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKVxyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gZGlzcG9zZSAoKSB7XHJcbiAgICB1bmRvU3R5bGVzKClcclxuICAgIGRpc3Bvc2VQcmludCgpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3ROb2RlcyAoZnJhbWUpIHtcclxuICBjb25zdCBjb250YWluZXIgPSBmcmFtZS5wYXJlbnROb2RlXHJcbiAgY29uc3QgZG9jID0gZnJhbWUuY29udGVudERvY3VtZW50XHJcblxyXG4gIGNvbnN0IGFuY2VzdG9ycyA9IFtdXHJcbiAgbGV0IGN1cnJlbnQgPSBjb250YWluZXJcclxuICB3aGlsZShjdXJyZW50LnBhcmVudE5vZGUpIHtcclxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGVcclxuICAgIGlmKGN1cnJlbnQuc3R5bGUpXHJcbiAgICAgIGFuY2VzdG9ycy5wdXNoKGN1cnJlbnQpXHJcbiAgfVxyXG4gIHJldHVybiB7IGZyYW1lLCBjb250YWluZXIsIGRvYywgYW5jZXN0b3JzIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3R5bGVzIChlbGVtZW50LCBzdHlsZXMpIHtcclxuICBjb25zdCBwcmV2U3R5bGVzID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5yZWR1Y2UoKHByZXYsIFsga2V5LCBuZXh0IF0pID0+IHtcclxuICAgIHByZXZba2V5XSA9IGVsZW1lbnQuc3R5bGVba2V5XVxyXG4gICAgaWYobmV4dClcclxuICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIG5leHQsICdpbXBvcnRhbnQnKVxyXG4gICAgZWxzZVxyXG4gICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleSlcclxuICAgIHJldHVybiBwcmV2XHJcbiAgfSwge30pXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHVuZG9TdHlsZXMgKCkge1xyXG4gICAgc2V0U3R5bGVzIChlbGVtZW50LCBwcmV2U3R5bGVzKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsib25QcmludCIsInByZXByaW50IiwicG9zdHByaW50Iiwid2luZG93Iiwib25iZWZvcmVwcmludCIsInVuZGVmaW5lZCIsIm9uYWZ0ZXJwcmludCIsImluZm8iLCJkaXNwb3NlIiwibXFsTGlzdGVuZXIiLCJtcWwiLCJtYXRjaGVzIiwibWF0Y2hNZWRpYSIsImFkZExpc3RlbmVyIiwiZGlzcG9zZU1lZGlhIiwicmVtb3ZlTGlzdGVuZXIiLCJ1c2VQcmludEZyYW1lIiwic2VsZWN0RnJhbWUiLCJkb2MiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdEhlaWdodEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYm9keSIsInNlbGVjdFdpZHRoRWxlbWVudCIsInNlbGVjdENvbnRhaW5lclN0eWxlIiwiaGVpZ2h0RWxlbWVudCIsIndpZHRoRWxlbWVudCIsInNlbGVjdEZyYW1lU3R5bGUiLCJwb3NpdGlvbiIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwic2VsZWN0QW5jZXN0b3JTdHlsZSIsImRpc3BsYXkiLCJwb3N0RGVsYXkiLCJzdHlsZXNJRCIsImRvY3VtZW50IiwiRXJyb3IiLCJzdHlsZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwic3R5bGVzIiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwidW5kb1N0eWxlcyIsInJlbW92ZUNoaWxkIiwidW5kb3MiLCJkaXNwb3NlUHJpbnQiLCJsb2ciLCJzZWxlY3ROb2RlcyIsImZyYW1lIiwiY29udGFpbmVyIiwiYW5jZXN0b3JzIiwiY29udGFpbmVyU3R5bGUiLCJmcmFtZVN0eWxlIiwiYW5jZXN0b3JTdHlsZSIsInB1c2giLCJzZXRTdHlsZXMiLCJjb25jYXQiLCJtYXAiLCJhbmNlc3RvciIsImxlbmd0aCIsInBvcCIsInBhcmVudE5vZGUiLCJjb250ZW50RG9jdW1lbnQiLCJjdXJyZW50Iiwic3R5bGUiLCJlbGVtZW50IiwicHJldlN0eWxlcyIsIk9iamVjdCIsImVudHJpZXMiLCJyZWR1Y2UiLCJwcmV2Iiwia2V5IiwibmV4dCIsInNldFByb3BlcnR5IiwicmVtb3ZlUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZSxTQUFTQSxPQUFULEdBQStDO2lGQUFKLEVBQUk7TUFBNUJDLFFBQTRCLFFBQTVCQSxRQUE0QjtNQUFsQkMsU0FBa0IsUUFBbEJBLFNBQWtCOztNQUN6RCxRQUFPQyxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXJCLEVBQ0U7TUFDQ0EsT0FBT0MsYUFBUCxL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
