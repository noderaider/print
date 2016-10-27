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
      preprint = _ref.preprint,
      postprint = _ref.postprint;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
    if (preprint) window.onbeforeprint = preprint;
    if (postprint) window.onafterprint = postprint;
  } else {
    if (preprint || postprint) window.matchMedia('print').addListener(function (mql) {
      return mql.matches ? preprint && preprint() : postprint && postprint();
    });
  }
}

exports.onPrint = printEvents;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9vblByaW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByaW50RXZlbnRzKHsgcHJlcHJpbnQsIHBvc3RwcmludCB9ID0ge30pIHtcclxuICBpZih0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JylcclxuICAgIHJldHVyblxyXG4gIGlmKHdpbmRvdy5vbmJlZm9yZXByaW50ICE9PSB1bmRlZmluZWQgJiYgd2luZG93Lm9uYWZ0ZXJwcmludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZihwcmVwcmludClcclxuICAgICAgd2luZG93Lm9uYmVmb3JlcHJpbnQgPSBwcmVwcmludFxyXG4gICAgaWYocG9zdHByaW50KVxyXG4gICAgICB3aW5kb3cub25hZnRlcnByaW50ID0gcG9zdHByaW50XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmKHByZXByaW50IHx8IHBvc3RwcmludClcclxuICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJ3ByaW50JykuYWRkTGlzdGVuZXIoKG1xbCkgPT4gbXFsLm1hdGNoZXMgPyAocHJlcHJpbnQgJiYgcHJlcHJpbnQoKSkgOiAocG9zdHByaW50ICYmIHBvc3RwcmludCgpKSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInByaW50RXZlbnRzIiwicHJlcHJpbnQiLCJwb3N0cHJpbnQiLCJ3aW5kb3ciLCJvbmJlZm9yZXByaW50IiwidW5kZWZpbmVkIiwib25hZnRlcnByaW50IiwibWF0Y2hNZWRpYSIsImFkZExpc3RlbmVyIiwibXFsIiwibWF0Y2hlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZSxTQUFTQSxXQUFULEdBQW1EO2lGQUFKLEVBQUk7TUFBNUJDLFFBQTRCLFFBQTVCQSxRQUE0QjtNQUFsQkMsU0FBa0IsUUFBbEJBLFNBQWtCOztNQUM3RCxRQUFPQyxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXJCLEVBQ0U7TUFDQ0EsT0FBT0MsYUFBUCxLQUF5QkMsU0FBekIsSUFBc0NGLE9BQU9HLFlBQVAsS0FBd0JELFNBQWpFLEVBQTRFO1FBQ3ZFSixRQUFILEVBQ0VFLE9BQU9DLGFBQVAsR0FBdUJILFFBQXZCO1FBQ0NDLFNBQUgsRUFDRUMsT0FBT0csWUFBUCxHQUFzQkosU0FBdEI7R0FKSixNQUtPO1FBQ0ZELFlBQVlDLFNBQWYsRUFDRUMsT0FBT0ksVUFBUCxDQUFrQixPQUFsQixFQUEyQkMsV0FBM0IsQ0FBdUMsVUFBQ0MsR0FBRDthQUFTQSxJQUFJQyxPQUFKLEdBQWVULFlBQVlBLFVBQTNCLEdBQTBDQyxhQUFhQSxXQUFoRTtLQUF2Qzs7Ozs7Ozs7In0=
