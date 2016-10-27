(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.printutils = global.printutils || {})));
}(this, (function (exports) { 'use strict';

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

function printEvents() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$preprint = _ref.preprint,
      preprint = _ref$preprint === undefined ? function () {} : _ref$preprint,
      _ref$postprint = _ref.postprint,
      postprint = _ref$postprint === undefined ? function () {} : _ref$postprint;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    window.onbeforeprint = preprint;
    window.onafterprint = postprint;
  } else {
    window.matchMedia('print').addListener(function (mql) {
      return (mql.matches ? preprint : postprint)();
    });
  }
}

exports.onPrint = printEvents;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9vblByaW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50RXZlbnRzKHsgcHJlcHJpbnQgPSAoKSA9PiB7fSwgcG9zdHByaW50ID0gKCkgPT4ge30gfSA9IHt9KSB7XHJcbiAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcpXHJcbiAgICByZXR1cm5cclxuICBpZih3aW5kb3cub25iZWZvcmVwcmludCAhPT0gdW5kZWZpbmVkICYmIHdpbmRvdy5vbmFmdGVycHJpbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgd2luZG93Lm9uYmVmb3JlcHJpbnQgPSBwcmVwcmludFxyXG4gICAgd2luZG93Lm9uYWZ0ZXJwcmludCA9IHBvc3RwcmludFxyXG4gIH0gZWxzZSB7XHJcbiAgICB3aW5kb3cubWF0Y2hNZWRpYSgncHJpbnQnKS5hZGRMaXN0ZW5lcigobXFsKSA9PiAobXFsLm1hdGNoZXMgPyBwcmVwcmludCA6IHBvc3RwcmludCkoKSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInByaW50RXZlbnRzIiwicHJlcHJpbnQiLCJwb3N0cHJpbnQiLCJ3aW5kb3ciLCJvbmJlZm9yZXByaW50IiwidW5kZWZpbmVkIiwib25hZnRlcnByaW50IiwibWF0Y2hNZWRpYSIsImFkZExpc3RlbmVyIiwibXFsIiwibWF0Y2hlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZSxTQUFTQSxXQUFULEdBQXlFO2lGQUFKLEVBQUk7MkJBQWxEQyxRQUFrRDtNQUFsREEsUUFBa0QsaUNBQXZDLFlBQU0sRUFBaUM7NEJBQTdCQyxTQUE2QjtNQUE3QkEsU0FBNkIsa0NBQWpCLFlBQU0sRUFBVzs7TUFDbkYsUUFBT0MsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFyQixFQUNFO01BQ0NBLE9BQU9DLGFBQVAsS0FBeUJDLFNBQXpCLElBQXNDRixPQUFPRyxZQUFQLEtBQXdCRCxTQUFqRSxFQUE0RTtXQUNuRUQsYUFBUCxHQUF1QkgsUUFBdkI7V0FDT0ssWUFBUCxHQUFzQkosU0FBdEI7R0FGRixNQUdPO1dBQ0VLLFVBQVAsQ0FBa0IsT0FBbEIsRUFBMkJDLFdBQTNCLENBQXVDLFVBQUNDLEdBQUQ7YUFBUyxDQUFDQSxJQUFJQyxPQUFKLEdBQWNULFFBQWQsR0FBeUJDLFNBQTFCLEdBQVQ7S0FBdkM7Ozs7Ozs7OyJ9
