(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.printutils = global.printutils || {})));
}(this, (function (exports) { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

var toInteger = _toInteger;
var defined   = _defined;
// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

var aFunction = _aFunction;
var _ctx = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!isObject$2(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var anObject       = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive    = _toPrimitive;
var dP$1             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP$1(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var dP         = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var global$1    = _global;
var core      = _core;
var ctx       = _ctx;
var hide$1      = _hide;
var PROTOTYPE = 'prototype';

var $export$1 = function(type, name, source){
  var IS_FORCED = type & $export$1.F
    , IS_GLOBAL = type & $export$1.G
    , IS_STATIC = type & $export$1.S
    , IS_PROTO  = type & $export$1.P
    , IS_BIND   = type & $export$1.B
    , IS_WRAP   = type & $export$1.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global$1)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export$1.R && expProto && !expProto[key])hide$1(expProto, key, out);
    }
  }
};
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

var _redefine = _hide;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var _iterators = {};

var toString$1 = {}.toString;

var _cof = function(it){
  return toString$1.call(it).slice(8, -1);
};

var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

var IObject = _iobject;
var defined$1 = _defined;
var _toIobject = function(it){
  return IObject(defined$1(it));
};

var toInteger$1 = _toInteger;
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$2 = _toInteger;
var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = toInteger$2(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

var toIObject$1 = _toIobject;
var toLength  = _toLength;
var toIndex   = _toIndex;
var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject$1($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var global$2 = _global;
var SHARED = '__core-js_shared__';
var store  = global$2[SHARED] || (global$2[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');
var uid    = _uid;
var _sharedKey = function(key){
  return shared[key] || (shared[key] = uid(key));
};

var has$2          = _has;
var toIObject    = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$1     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO$1)has$2(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has$2(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

var $keys       = _objectKeysInternal;
var enumBugKeys$1 = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O){
  return $keys(O, enumBugKeys$1);
};

var dP$2       = _objectDp;
var anObject$2 = _anObject;
var getKeys  = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  anObject$2(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP$2.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _html = _global.document && document.documentElement;

var anObject$1    = _anObject;
var dPs         = _objectDps;
var enumBugKeys = _enumBugKeys;
var IE_PROTO    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$1   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE$1][enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$1] = anObject$1(O);
    result = new Empty;
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , uid        = _uid
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;
var has$3 = _has;
var TAG = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !has$3(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

var create$1         = _objectCreate;
var descriptor     = _propertyDesc;
var setToStringTag$1 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = create$1(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag$1(Constructor, NAME + ' Iterator');
};

var defined$2 = _defined;
var _toObject = function(it){
  return Object(defined$2(it));
};

var has$4         = _has;
var toObject    = _toObject;
var IE_PROTO$2    = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has$4(O, IE_PROTO$2))return O[IE_PROTO$2];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var LIBRARY        = _library;
var $export        = _export;
var redefine       = _redefine;
var hide           = _hide;
var has$1            = _has;
var Iterators      = _iterators;
var $iterCreate    = _iterCreate;
var setToStringTag = _setToStringTag;
var getPrototypeOf = _objectGpo;
var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has$1(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

var _addToUnscopables = function(){ /* empty */ };

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

var addToUnscopables = _addToUnscopables;
var step             = _iterStep;
var Iterators$2        = _iterators;
var toIObject$2        = _toIobject;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = toIObject$2(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$2.Arguments = Iterators$2.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var global$3        = _global;
var hide$2          = _hide;
var Iterators$1     = _iterators;
var TO_STRING_TAG = _wks('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global$3[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide$2(proto, TO_STRING_TAG, NAME);
  Iterators$1[NAME] = Iterators$1.Array;
}

var f$1 = _wks;

var _wksExt = {
	f: f$1
};

var iterator$2 = _wksExt.f('iterator');

var iterator = createCommonjsModule(function (module) {
module.exports = { "default": iterator$2, __esModule: true };
});

var _meta = createCommonjsModule(function (module) {
var META     = _uid('meta')
  , isObject = _isObject
  , has      = _has
  , setDesc  = _objectDp.f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_fails(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
});

var global$5         = _global;
var core$1           = _core;
var LIBRARY$1        = _library;
var wksExt$1         = _wksExt;
var defineProperty$1 = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = core$1.Symbol || (core$1.Symbol = LIBRARY$1 ? {} : global$5.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$1($Symbol, name, {value: wksExt$1.f(name)});
};

var getKeys$1   = _objectKeys;
var toIObject$4 = _toIobject;
var _keyof = function(object, el){
  var O      = toIObject$4(object)
    , keys   = getKeys$1(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

var f$2 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$2
};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

var getKeys$2 = _objectKeys;
var gOPS    = _objectGops;
var pIE     = _objectPie;
var _enumKeys = function(it){
  var result     = getKeys$2(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

var cof$1 = _cof;
var _isArray = Array.isArray || function isArray(arg){
  return cof$1(arg) == 'Array';
};

var $keys$2      = _objectKeysInternal;
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys$2(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};

var toIObject$5 = _toIobject;
var gOPN$1      = _objectGopn.f;
var toString$2  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN$1(it);
  } catch(e){
    return windowNames.slice();
  }
};

var f$4 = function getOwnPropertyNames(it){
  return windowNames && toString$2.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$5(it));
};

var _objectGopnExt = {
	f: f$4
};

var pIE$1            = _objectPie;
var createDesc$2     = _propertyDesc;
var toIObject$6      = _toIobject;
var toPrimitive$2    = _toPrimitive;
var has$6            = _has;
var IE8_DOM_DEFINE$1 = _ie8DomDefine;
var gOPD$1           = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
  O = toIObject$6(O);
  P = toPrimitive$2(P, true);
  if(IE8_DOM_DEFINE$1)try {
    return gOPD$1(O, P);
  } catch(e){ /* empty */ }
  if(has$6(O, P))return createDesc$2(!pIE$1.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

var global$4         = _global;
var has$5            = _has;
var DESCRIPTORS    = _descriptors;
var $export$2        = _export;
var redefine$1       = _redefine;
var META           = _meta.KEY;
var $fails         = _fails;
var shared$1         = _shared;
var setToStringTag$2 = _setToStringTag;
var uid$1            = _uid;
var wks            = _wks;
var wksExt         = _wksExt;
var wksDefine      = _wksDefine;
var keyOf          = _keyof;
var enumKeys       = _enumKeys;
var isArray$1        = _isArray;
var anObject$3       = _anObject;
var toIObject$3      = _toIobject;
var toPrimitive$1    = _toPrimitive;
var createDesc$1     = _propertyDesc;
var _create        = _objectCreate;
var gOPNExt        = _objectGopnExt;
var $GOPD          = _objectGopd;
var $DP            = _objectDp;
var $keys$1          = _objectKeys;
var gOPD           = $GOPD.f;
var dP$3             = $DP.f;
var gOPN           = gOPNExt.f;
var $Symbol        = global$4.Symbol;
var $JSON          = global$4.JSON;
var _stringify     = $JSON && $JSON.stringify;
var PROTOTYPE$2      = 'prototype';
var HIDDEN         = wks('_hidden');
var TO_PRIMITIVE   = wks('toPrimitive');
var isEnum         = {}.propertyIsEnumerable;
var SymbolRegistry = shared$1('symbol-registry');
var AllSymbols     = shared$1('symbols');
var OPSymbols      = shared$1('op-symbols');
var ObjectProto$1    = Object[PROTOTYPE$2];
var USE_NATIVE     = typeof $Symbol == 'function';
var QObject        = global$4.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP$3({}, 'a', {
    get: function(){ return dP$3(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto$1, key);
  if(protoDesc)delete ObjectProto$1[key];
  dP$3(it, key, D);
  if(protoDesc && it !== ObjectProto$1)dP$3(ObjectProto$1, key, protoDesc);
} : dP$3;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
  anObject$3(it);
  key = toPrimitive$1(key, true);
  anObject$3(D);
  if(has$5(AllSymbols, key)){
    if(!D.enumerable){
      if(!has$5(it, HIDDEN))dP$3(it, HIDDEN, createDesc$1(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has$5(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc$1(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP$3(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject$3(it);
  var keys = enumKeys(P = toIObject$3(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive$1(key, true));
  if(this === ObjectProto$1 && has$5(AllSymbols, key) && !has$5(OPSymbols, key))return false;
  return E || !has$5(this, key) || !has$5(AllSymbols, key) || has$5(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject$3(it);
  key = toPrimitive$1(key, true);
  if(it === ObjectProto$1 && has$5(AllSymbols, key) && !has$5(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has$5(AllSymbols, key) && !(has$5(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject$3(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has$5(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto$1
    , names  = gOPN(IS_OP ? OPSymbols : toIObject$3(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has$5(AllSymbols, key = names[i++]) && (IS_OP ? has$5(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid$1(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto$1)$set.call(OPSymbols, value);
      if(has$5(this, HIDDEN) && has$5(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc$1(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine$1($Symbol[PROTOTYPE$2], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
  _objectPie.f  = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_library){
    redefine$1(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  };
}

$export$2($export$2.G + $export$2.W + $export$2.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i$1 = 0; symbols.length > i$1; )wks(symbols[i$1++]);

for(var symbols = $keys$1(wks.store), i$1 = 0; symbols.length > i$1; )wksDefine(symbols[i$1++]);

$export$2($export$2.S + $export$2.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has$5(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export$2($export$2.S + $export$2.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export$2($export$2.S + $export$2.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray$1(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag$2($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag$2(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag$2(global$4.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var index = _core.Symbol;

var symbol = createCommonjsModule(function (module) {
module.exports = { "default": index, __esModule: true };
});

var _typeof_1 = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _iterator = iterator;

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = symbol;

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

function onPrint() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      preprint = _ref.preprint,
      postprint = _ref.postprint;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (window.onbeforeprint !== undefined && window.onafterprint !== undefined) {
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

      var mql = window.matchMedia('print');
      mql.addListener(mqlListener);
      return {
        v: function disposeMedia() {
          mql.removeListener(mqlListener);
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return function () {};
  }
}

var $export$3 = _export;
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export$3($export$3.S + $export$3.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $Object = _core.Object;
var defineProperty$3 = function defineProperty$3(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$2 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$3, __esModule: true };
});

var _Object$defineProperty = unwrapExports(defineProperty$2);

var cof$2 = _cof;
var TAG$1 = _wks('toStringTag');
var ARG = cof$2(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

var _classof = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? cof$2(O)
    // ES3 arguments fallback
    : (B = cof$2(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var classof   = _classof;
var ITERATOR$1  = _wks('iterator');
var Iterators$3 = _iterators;
var core_isIterable = _core.isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR$1] !== undefined
    || '@@iterator' in O
    || Iterators$3.hasOwnProperty(classof(O));
};

var isIterable$2 = core_isIterable;

var isIterable = createCommonjsModule(function (module) {
module.exports = { "default": isIterable$2, __esModule: true };
});

var classof$1   = _classof;
var ITERATOR$2  = _wks('iterator');
var Iterators$4 = _iterators;
var core_getIteratorMethod = _core.getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR$2]
    || it['@@iterator']
    || Iterators$4[classof$1(it)];
};

var anObject$4 = _anObject;
var get      = core_getIteratorMethod;
var core_getIterator = _core.getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject$4(iterFn.call(it));
};

var getIterator$1 = core_getIterator;

var getIterator = createCommonjsModule(function (module) {
module.exports = { "default": getIterator$1, __esModule: true };
});

var _getIterator = unwrapExports(getIterator);

var slicedToArray = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _isIterable2 = isIterable;

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = getIterator;

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
});

var _slicedToArray = unwrapExports(slicedToArray);

var getKeys$3   = _objectKeys;
var toIObject$7 = _toIobject;
var isEnum$1    = _objectPie.f;
var _objectToArray = function(isEntries){
  return function(it){
    var O      = toIObject$7(it)
      , keys   = getKeys$3(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum$1.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

var $export$4  = _export;
var $entries = _objectToArray(true);

$export$4($export$4.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

var entries$2 = _core.Object.entries;

var entries$1 = createCommonjsModule(function (module) {
module.exports = { "default": entries$2, __esModule: true };
});

var _Object$entries = unwrapExports(entries$1);

var anObject$5 = _anObject;
var _iterCall = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject$5(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject$5(ret.call(iterator));
    throw e;
  }
};

var Iterators$5  = _iterators;
var ITERATOR$3   = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function(it){
  return it !== undefined && (Iterators$5.Array === it || ArrayProto[ITERATOR$3] === it);
};

var $defineProperty$1 = _objectDp;
var createDesc$3      = _propertyDesc;

var _createProperty = function(object, index, value){
  if(index in object)$defineProperty$1.f(object, index, createDesc$3(0, value));
  else object[index] = value;
};

var ITERATOR$4     = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

var _iterDetect = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR$4]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR$4] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

var ctx$1            = _ctx;
var $export$5        = _export;
var toObject$1       = _toObject;
var call           = _iterCall;
var isArrayIter    = _isArrayIter;
var toLength$1       = _toLength;
var createProperty = _createProperty;
var getIterFn      = core_getIteratorMethod;

$export$5($export$5.S + $export$5.F * !_iterDetect(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject$1(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx$1(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength$1(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from$3 = _core.Array.from;

var from$1 = createCommonjsModule(function (module) {
module.exports = { "default": from$3, __esModule: true };
});

var toConsumableArray = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _from = from$1;

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var hide$3 = _hide;
var _redefineAll = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide$3(target, key, src[key]);
  } return target;
};

var _anInstance = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var ctx         = _ctx
  , call        = _iterCall
  , isArrayIter = _isArrayIter
  , anObject    = _anObject
  , toLength    = _toLength
  , getIterFn   = core_getIteratorMethod
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
});

var global$6      = _global;
var core$2        = _core;
var dP$5          = _objectDp;
var DESCRIPTORS$2 = _descriptors;
var SPECIES     = _wks('species');

var _setSpecies = function(KEY){
  var C = typeof core$2[KEY] == 'function' ? core$2[KEY] : global$6[KEY];
  if(DESCRIPTORS$2 && C && !C[SPECIES])dP$5.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

var dP$4          = _objectDp.f;
var create$2      = _objectCreate;
var redefineAll = _redefineAll;
var ctx$2         = _ctx;
var anInstance  = _anInstance;
var defined$3     = _defined;
var forOf       = _forOf;
var $iterDefine = _iterDefine;
var step$1        = _iterStep;
var setSpecies  = _setSpecies;
var DESCRIPTORS$1 = _descriptors;
var fastKey$1     = _meta.fastKey;
var SIZE        = DESCRIPTORS$1 ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey$1(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

var _collectionStrong = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create$2(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx$2(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS$1)dP$4(C.prototype, 'size', {
      get: function(){
        return defined$3(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey$1(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step$1(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step$1(0, entry.k);
      if(kind == 'values')return step$1(0, entry.v);
      return step$1(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

var isObject$4 = _isObject;
var isArray$2  = _isArray;
var SPECIES$1  = _wks('species');

var _arraySpeciesConstructor = function(original){
  var C;
  if(isArray$2(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray$2(C.prototype)))C = undefined;
    if(isObject$4(C)){
      C = C[SPECIES$1];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

var speciesConstructor = _arraySpeciesConstructor;

var _arraySpeciesCreate = function(original, length){
  return new (speciesConstructor(original))(length);
};

var ctx$3      = _ctx;
var IObject$1  = _iobject;
var toObject$2 = _toObject;
var toLength$2 = _toLength;
var asc      = _arraySpeciesCreate;
var _arrayMethods = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject$2($this)
      , self   = IObject$1(O)
      , f      = ctx$3(callbackfn, that, 3)
      , length = toLength$2(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var global$7         = _global;
var $export$6        = _export;
var meta           = _meta;
var fails          = _fails;
var hide$4           = _hide;
var redefineAll$1    = _redefineAll;
var forOf$1          = _forOf;
var anInstance$1     = _anInstance;
var isObject$3       = _isObject;
var setToStringTag$3 = _setToStringTag;
var dP$6             = _objectDp.f;
var each           = _arrayMethods(0);
var DESCRIPTORS$3    = _descriptors;

var _collection = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global$7[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS$3 || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll$1(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance$1(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf$1(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide$4(C.prototype, KEY, function(a, b){
        anInstance$1(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject$3(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP$6(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag$3(C, NAME);

  O[NAME] = C;
  $export$6($export$6.G + $export$6.W + $export$6.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

var strong = _collectionStrong;

// 23.2 Set Objects
var es6_set = _collection('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

var forOf$2 = _forOf;

var _arrayFromIterable = function(iter, ITERATOR){
  var result = [];
  forOf$2(iter, false, result.push, result, ITERATOR);
  return result;
};

var classof$2 = _classof;
var from$5    = _arrayFromIterable;
var _collectionToJson = function(NAME){
  return function toJSON(){
    if(classof$2(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from$5(this);
  };
};

var $export$7  = _export;

$export$7($export$7.P + $export$7.R, 'Set', {toJSON: _collectionToJson('Set')});

var set$1 = _core.Set;

var set = createCommonjsModule(function (module) {
module.exports = { "default": set$1, __esModule: true };
});

var _Set = unwrapExports(set);

var stripper = /^([0-9a-z\- ]*[^ !$]) ?!?([a-z]+)?/;

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

function serializeCSSProperty(prop) {
  if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object' || !prop.value) throw new Error('serializeCSSProperty requires an object property with value and priority (optional) keys.');
  var value = prop.value,
      priority = prop.priority;

  return priority ? value + ' !' + priority : value;
}

function usePrintFrame(frame) {
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

    return { position: 'absolute !important'
      /*
      , width: 'unset !important'
      , height: 'unset !important'
      , width: `${widthElement.offsetWidth}px`
      , height: `${heightElement.offsetHeight}px`
      */
      , 'min-width': '900px !important',
      'min-height': 'unset !important',
      'max-width': 'unset !important',
      'max-height': 'unset !important',
      top: '0px !important',
      bottom: '0px !important',
      left: '0px !important',
      right: '0px !important',
      border: '2px dashed blue !important'
      //, border: '0px !important'
      , overflow: 'visible !important'
    }
    /*
      , display: 'inline-block'
      , height: '100%'
      , width: '100%'
      */
    ;
  } : _ref$selectContainerS,
      _ref$selectFrameStyle = _ref.selectFrameStyle,
      selectFrameStyle = _ref$selectFrameStyle === undefined ? function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref3.doc,
        heightElement = _ref3.heightElement,
        widthElement = _ref3.widthElement;

    return { position: 'absolute !important',
      display: 'inline-block !important',
      width: widthElement.offsetWidth + 'px',
      height: heightElement.offsetHeight + 'px'
      /*
      , 'min-width': 'unset !important'
      , 'min-height': 'unset !important'
      , 'max-width': 'unset !important'
      , 'max-height': 'unset !important'
      */
      , top: '0px !important',
      bottom: '0px !important',
      left: '0px !important',
      right: '0px !important',
      border: '1px dashed green !important'
      //, border: '0px !important'
      , margin: '0px !important',
      padding: '0px !important',
      'padding-top': '0px !important',
      'padding-bottom': '0px !important',
      overflow: 'visible !important',
      transform: 'initial !important',
      'box-shadow': 'none !important',
      'background-color': 'transparent !important',
      'border-radius': '0 !important'
    }
    /*
    , 'min-height': `${heightElement.offsetHeight}px !important`
    , 'min-width': `${widthElement.offsetWidth}px !important`
    */
    /*
    .print-target {
    display: inline-block;
    /* position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    overflow: visible;
    height: 100% !important;
    width: 1500px;
    border:none;position:absolute;width:0px;height:0px;bottom:0px;left:0px;
    */
    ;
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

    return { margin: '0px !important'
      //, 'margin-right': '40px !important'
      , padding: '0px !important'
      //, 'padding-right': '30px !important'
      , 'padding-top': '0px !important',
      'padding-bottom': '0px !important',
      'position': 'fixed !important',
      top: '0px !important',
      bottom: '0px !important',
      left: '0px !important',
      right: '0px !important',
      overflow: 'visible !important'
    };
  } : _ref$selectFrameBodyS,
      _ref$selectAncestorSt = _ref.selectAncestorStyle,
      selectAncestorStyle = _ref$selectAncestorSt === undefined ? function () {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doc = _ref7.doc,
        heightElement = _ref7.heightElement,
        widthElement = _ref7.widthElement;

    return { display: 'inline-block !important',
      position: 'static !important',
      overflow: 'visible !important'
    };
  } : _ref$selectAncestorSt,
      _ref$topPrintCSS = _ref.topPrintCSS,
      topPrintCSS = _ref$topPrintCSS === undefined ? '\nbody {\n  display: inline-block !important;\n  border: 3px solid red !important;\n}\nbody * {\n  display: none !important;\n  position: unset !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n' : _ref$topPrintCSS,
      _ref$framePrintCSS = _ref.framePrintCSS,
      framePrintCSS = _ref$framePrintCSS === undefined ? '' : _ref$framePrintCSS;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;
  if (!frame) throw new Error('usePrintFrame must be provided the frame element.');

  var undoTopCSS = topPrintCSS ? setPrintCSS(document, topPrintCSS) : function () {};
  var undoFrameCSS = framePrintCSS ? setPrintCSS(resolveDocument(frame), framePrintCSS) : function () {};

  //setStyles(document.body, { border: '1px dashed red !important' })

  //const undoPrelimFrameStyle = setStyles(frame, { 'will-change': 'position display width height min-width min-height max-width max-height !important' })

  var undos = new _Set();
  var disposePrint = onPrint({
    preprint: function preprint() {
      var _selectNodes = selectNodes(frame),
          container = _selectNodes.container,
          doc = _selectNodes.doc,
          ancestors = _selectNodes.ancestors;

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

      undos = new _Set([setStyles(container, containerStyle), setStyles(frame, frameStyle), setStyles(doc.body, heightElementStyle), setStyles(doc.body, widthElementStyle), setStyles(doc.body, frameBodyStyle)].concat(_toConsumableArray(ancestors.map(function (ancestor) {
        return setStyles(ancestor, ancestorStyle);
      }))));
      console.log('--preprint--', undos.size);
    },
    postprint: function postprint() {
      console.log('--postprint--', undos.size);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(undos), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
  });

  return function dispose() {
    undoTopCSS();
    undoFrameCSS();
    undoStyles();
  };
}

function selectNodes(frame) {
  var container = frame.parentNode;
  var doc = resolveDocument(frame);

  var ancestors = [];
  var current = container;
  while (current.parentNode) {
    current = current.parentNode;
    if (current.style) ancestors.push(current);
  }
  return { container: container, doc: doc, ancestors: ancestors };
}

/*
overflow: hidden; min-width: 990px; height: 385px; width: 990px;
overflow: hidden; min-width: 377px !important; height: 385px; width: 990px; position: fixed !important; display: inline-block !important; min-height: 286px !important;
overflow: hidden; min-width: 990px !important; height: 385px; width: 990px;
*/

function resolveDocument(obj) {
  if (obj.contentDocument) return obj.contentDocument;else if (obj.contentWindow) return obj.contentWindow.contentDocument;else if (obj.document) return obj.document;
  throw new Error('resolveDocument found no document object');
}

var stylesID = 'use-print-frame-styles';
function setPrintCSS(doc, css) {
  if (doc.getElementById(stylesID)) throw new Error('setPrintCSS should not be registered twice on the same document - call undoPrintCSS first.');
  var styleElement = doc.createElement('style');
  styleElement.setAttribute('id', stylesID);
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('media', 'print');
  styleElement.innerHTML = css;
  doc.head.appendChild(styleElement);
  return function undoPrintCSS() {
    doc.head.removeChild(styleElement);
  };
}

function setStyles(element, styles) {
  var prevStyles = _Object$entries(styles).reduce(function (prev, _ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        key = _ref9[0],
        next = _ref9[1];

    var prop = { value: element.style.getPropertyValue(key), priority: element.style.getPropertyPriority(key) };
    console.info('SET STYLES', key, next, prop);
    var serialized = prop.value ? serializeCSSProperty(prop) : null;
    _Object$defineProperty(prev, key, { value: serialized, enumerable: true });
    if (next) {
      var _parseCSSProperty = parseCSSProperty(next),
          value = _parseCSSProperty.value,
          priority = _parseCSSProperty.priority;

      element.style.setProperty(key, value, priority);
    } else {
      element.style.removeProperty(key);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCIuLi9zcmMvb25QcmludC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2VudHJpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9lbnRyaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnNldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zZXQuanMiLCIuLi9zcmMvdXRpbHMvcGFyc2VDU1NQcm9wZXJ0eS5qcyIsIi4uL3NyYy91dGlscy9zZXJpYWxpemVDU1NQcm9wZXJ0eS5qcyIsIi4uL3NyYy91c2VQcmludEZyYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7IiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sOyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvblByaW50KHsgcHJlcHJpbnQsIHBvc3RwcmludCB9ID0ge30pIHtcclxuICBpZih0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JylcclxuICAgIHJldHVyblxyXG4gIGlmKHdpbmRvdy5vbmJlZm9yZXByaW50ICE9PSB1bmRlZmluZWQgJiYgd2luZG93Lm9uYWZ0ZXJwcmludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZihwcmVwcmludClcclxuICAgICAgd2luZG93Lm9uYmVmb3JlcHJpbnQgPSBwcmVwcmludFxyXG4gICAgaWYocG9zdHByaW50KVxyXG4gICAgICB3aW5kb3cub25hZnRlcnByaW50ID0gcG9zdHByaW50XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZGlzcG9zZSAoKSB7XHJcbiAgICAgIGlmKHByZXByaW50KVxyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXByaW50ID0gbnVsbFxyXG4gICAgICBpZihwb3N0cHJpbnQpXHJcbiAgICAgICAgd2luZG93Lm9uYWZ0ZXJwcmludCA9IG51bGxcclxuICAgIH1cclxuICB9IGVsc2UgaWYocHJlcHJpbnQgfHwgcG9zdHByaW50KSB7XHJcbiAgICBmdW5jdGlvbiBtcWxMaXN0ZW5lciAobXFsKSB7XHJcbiAgICAgIGlmKG1xbC5tYXRjaGVzICYmIHByZXByaW50KVxyXG4gICAgICAgIHByZXByaW50KClcclxuICAgICAgZWxzZSBpZighbXFsLm1hdGNoZXMgJiYgcG9zdHByaW50KVxyXG4gICAgICAgIHBvc3RwcmludCgpXHJcbiAgICB9XHJcbiAgICBjb25zdCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYSgncHJpbnQnKVxyXG4gICAgbXFsLmFkZExpc3RlbmVyKG1xbExpc3RlbmVyKVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRpc3Bvc2VNZWRpYSAoKSB7XHJcbiAgICAgIG1xbC5yZW1vdmVMaXN0ZW5lcihtcWxMaXN0ZW5lcilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuICgpID0+IHt9XHJcbiAgfVxyXG59XHJcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59OyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpOyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpOyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgaXNFbnVtICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzRW50cmllcyl7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdChpdClcbiAgICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpe1xuICAgICAgcmVzdWx0LnB1c2goaXNFbnRyaWVzID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9O1xufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpe1xuICAgIHJldHVybiAkZW50cmllcyhpdCk7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZW50cmllczsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2VudHJpZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTsiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMsIHNhZmUpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpe1xuICAgIGlmKHNhZmUgJiYgdGFyZ2V0W2tleV0pdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgLCBCUkVBSyAgICAgICA9IHt9XG4gICwgUkVUVVJOICAgICAgPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyAgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOOyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGlzQXJyYXkgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIFNQRUNJRVMgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCl7XG4gIHZhciBDO1xuICBpZihpc0FycmF5KG9yaWdpbmFsKSl7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKUMgPSB1bmRlZmluZWQ7XG4gICAgaWYoaXNPYmplY3QoQykpe1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZihDID09PSBudWxsKUMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59OyIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwsIGxlbmd0aCl7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59OyIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSwgJGNyZWF0ZSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVhcbiAgICAsIGNyZWF0ZSAgICAgICAgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QoJHRoaXMpXG4gICAgICAsIHNlbGYgICA9IElPYmplY3QoTylcbiAgICAgICwgZiAgICAgID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBtZXRhICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGZhaWxzICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGZvck9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBhbkluc3RhbmNlICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgZWFjaCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGFyZ2V0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSwgJ19jJyk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgIGVhY2goJ2FkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTicuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgS0VZKTtcbiAgICAgICAgaWYoIUlTX0FEREVSICYmIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpKXJldHVybiBLRVkgPT0gJ2dldCcgPyB1bmRlZmluZWQgOiBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NbS0VZXShhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gSVNfQURERVIgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoJ3NpemUnIGluIHByb3RvKWRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpOyIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnU2V0Jywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpfSk7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnNldCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcuc2V0LnRvLWpzb24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlNldDsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc2V0XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiY29uc3Qgc3RyaXBwZXIgPSAvXihbMC05YS16XFwtIF0qW14gISRdKSA/IT8oW2Etel0rKT8vXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUNTU1Byb3BlcnR5KHJhdykge1xyXG4gIGlmKHR5cGVvZiByYXcgIT09ICdzdHJpbmcnKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwYXJzZUNTU1Byb3BlcnR5IGV4cGVjdHMgYSBzdHJpbmcgQ1NTIHZhbHVlIGlucHV0LicpXHJcblxyXG4gIGNvbnN0IFsgbWF0Y2gsIHZhbHVlLCBwcmlvcml0eSA9ICcnIF0gPSBzdHJpcHBlci5leGVjKHJhdykgfHwgW11cclxuICBpZighdmFsdWUpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHBhcnNlQ1NTUHJvcGVydHkgY291bGQgbm90IHBhcnNlIGEgcHJvcGVydHkgdmFsdWUgZnJvbSAnJHtyYXd9J2ApXHJcbiAgcmV0dXJuIHsgdmFsdWUsIHByaW9yaXR5IH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXJpYWxpemVDU1NQcm9wZXJ0eSAocHJvcCkge1xyXG4gIGlmKHR5cGVvZiBwcm9wICE9PSAnb2JqZWN0JyB8fCAhcHJvcC52YWx1ZSlcclxuICAgIHRocm93IG5ldyBFcnJvcignc2VyaWFsaXplQ1NTUHJvcGVydHkgcmVxdWlyZXMgYW4gb2JqZWN0IHByb3BlcnR5IHdpdGggdmFsdWUgYW5kIHByaW9yaXR5IChvcHRpb25hbCkga2V5cy4nKVxyXG4gIGNvbnN0IHsgdmFsdWUsIHByaW9yaXR5IH0gPSBwcm9wXHJcbiAgcmV0dXJuIHByaW9yaXR5ID8gYCR7dmFsdWV9ICEke3ByaW9yaXR5fWAgOiB2YWx1ZVxyXG59XHJcbiIsImltcG9ydCBvblByaW50IGZyb20gJy4vb25QcmludCdcclxuaW1wb3J0IHBhcnNlQ1NTUHJvcGVydHkgZnJvbSAnLi91dGlscy9wYXJzZUNTU1Byb3BlcnR5J1xyXG5pbXBvcnQgc2VyaWFsaXplQ1NTUHJvcGVydHkgZnJvbSAnLi91dGlscy9zZXJpYWxpemVDU1NQcm9wZXJ0eSdcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VQcmludEZyYW1lKCBmcmFtZVxyXG4sIHsgc2VsZWN0SGVpZ2h0RWxlbWVudCA9IChkb2MpID0+IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZnJhbWUtaGVpZ2h0XScpIHx8IGRvYy5ib2R5XHJcbiAgLCBzZWxlY3RXaWR0aEVsZW1lbnQgPSAoZG9jKSA9PiBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtaWZyYW1lLXdpZHRoXScpIHx8IGRvYy5ib2R5XHJcbiAgLCBzZWxlY3RDb250YWluZXJTdHlsZSA9ICh7IGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50IH0gPSB7fSkgPT4gKFxyXG4gICAgICB7IHBvc2l0aW9uOiAnYWJzb2x1dGUgIWltcG9ydGFudCdcclxuICAgICAgLypcclxuICAgICAgLCB3aWR0aDogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgaGVpZ2h0OiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgLCB3aWR0aDogYCR7d2lkdGhFbGVtZW50Lm9mZnNldFdpZHRofXB4YFxyXG4gICAgICAsIGhlaWdodDogYCR7aGVpZ2h0RWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgXHJcbiAgICAgICovXHJcbiAgICAgICwgJ21pbi13aWR0aCc6ICc5MDBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsICdtaW4taGVpZ2h0JzogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ21heC13aWR0aCc6ICd1bnNldCAhaW1wb3J0YW50J1xyXG4gICAgICAsICdtYXgtaGVpZ2h0JzogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgdG9wOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgYm90dG9tOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgbGVmdDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIHJpZ2h0OiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgYm9yZGVyOiAnMnB4IGRhc2hlZCBibHVlICFpbXBvcnRhbnQnXHJcbiAgICAgIC8vLCBib3JkZXI6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBvdmVyZmxvdzogJ3Zpc2libGUgIWltcG9ydGFudCdcclxuICAgICAgfVxyXG4gICAgLypcclxuICAgICAgLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAsIGhlaWdodDogJzEwMCUnXHJcbiAgICAgICwgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICAqL1xyXG4gICAgKVxyXG5cclxuICAsIHNlbGVjdEZyYW1lU3R5bGUgPSAoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9ID0ge30pID0+IChcclxuICAgICAgeyBwb3NpdGlvbjogJ2Fic29sdXRlICFpbXBvcnRhbnQnXHJcbiAgICAgICwgZGlzcGxheTogJ2lubGluZS1ibG9jayAhaW1wb3J0YW50J1xyXG4gICAgICAsIHdpZHRoOiBgJHt3aWR0aEVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgXHJcbiAgICAgICwgaGVpZ2h0OiBgJHtoZWlnaHRFbGVtZW50Lm9mZnNldEhlaWdodH1weGBcclxuICAgICAgLypcclxuICAgICAgLCAnbWluLXdpZHRoJzogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ21pbi1oZWlnaHQnOiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgLCAnbWF4LXdpZHRoJzogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ21heC1oZWlnaHQnOiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgKi9cclxuICAgICAgLCB0b3A6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBib3R0b206ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBsZWZ0OiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgcmlnaHQ6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBib3JkZXI6ICcxcHggZGFzaGVkIGdyZWVuICFpbXBvcnRhbnQnXHJcbiAgICAgIC8vLCBib3JkZXI6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBtYXJnaW46ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBwYWRkaW5nOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ3BhZGRpbmctdG9wJzogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsICdwYWRkaW5nLWJvdHRvbSc6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBvdmVyZmxvdzogJ3Zpc2libGUgIWltcG9ydGFudCdcclxuICAgICAgLCB0cmFuc2Zvcm06ICdpbml0aWFsICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ2JveC1zaGFkb3cnOiAnbm9uZSAhaW1wb3J0YW50J1xyXG4gICAgICAsICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ2JvcmRlci1yYWRpdXMnOiAnMCAhaW1wb3J0YW50J1xyXG4gICAgICB9XHJcbiAgICAgIC8qXHJcbiAgICAgICwgJ21pbi1oZWlnaHQnOiBgJHtoZWlnaHRFbGVtZW50Lm9mZnNldEhlaWdodH1weCAhaW1wb3J0YW50YFxyXG4gICAgICAsICdtaW4td2lkdGgnOiBgJHt3aWR0aEVsZW1lbnQub2Zmc2V0V2lkdGh9cHggIWltcG9ydGFudGBcclxuICAgICAgKi9cclxuICAgICAgLypcclxuICAgICAgLnByaW50LXRhcmdldCB7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIC8qIHBvc2l0aW9uOiBmaXhlZCAhaW1wb3J0YW50O1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBvdmVyZmxvdzogdmlzaWJsZTtcclxuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcclxuICB3aWR0aDogMTUwMHB4O1xyXG4gICAgICBib3JkZXI6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDowcHg7aGVpZ2h0OjBweDtib3R0b206MHB4O2xlZnQ6MHB4O1xyXG4gICAgICAqL1xyXG4gICAgKVxyXG4gICAgLCBzZWxlY3RIZWlnaHRFbGVtZW50U3R5bGUgPSAoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9ID0ge30pID0+IChcclxuICAgICAge31cclxuICAgIClcclxuICAsIHNlbGVjdFdpZHRoRWxlbWVudFN0eWxlID0gKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSA9IHt9KSA9PiAoXHJcbiAgICAgIHt9XHJcbiAgICApXHJcbiAgLCBzZWxlY3RGcmFtZUJvZHlTdHlsZSA9ICh7IGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50IH0gPSB7fSkgPT4gKFxyXG4gICAgICB7IG1hcmdpbjogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAvLywgJ21hcmdpbi1yaWdodCc6ICc0MHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgcGFkZGluZzogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAvLywgJ3BhZGRpbmctcmlnaHQnOiAnMzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsICdwYWRkaW5nLXRvcCc6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCAncGFkZGluZy1ib3R0b20nOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ3Bvc2l0aW9uJzogJ2ZpeGVkICFpbXBvcnRhbnQnXHJcbiAgICAgICwgdG9wOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgYm90dG9tOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgbGVmdDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIHJpZ2h0OiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgb3ZlcmZsb3c6ICd2aXNpYmxlICFpbXBvcnRhbnQnXHJcbiAgICAgIH1cclxuICAgIClcclxuICAsIHNlbGVjdEFuY2VzdG9yU3R5bGUgPSAoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9ID0ge30pID0+IChcclxuICAgICAgeyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrICFpbXBvcnRhbnQnXHJcbiAgICAgICwgcG9zaXRpb246ICdzdGF0aWMgIWltcG9ydGFudCdcclxuICAgICAgLCBvdmVyZmxvdzogJ3Zpc2libGUgIWltcG9ydGFudCdcclxuICAgICAgfVxyXG4gICAgKVxyXG4gICwgdG9wUHJpbnRDU1MgPSBgXHJcbmJvZHkge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50O1xyXG4gIGJvcmRlcjogM3B4IHNvbGlkIHJlZCAhaW1wb3J0YW50O1xyXG59XHJcbmJvZHkgKiB7XHJcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIHBvc2l0aW9uOiB1bnNldCAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbjogMCAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxufVxyXG5gXHJcbiAgLCBmcmFtZVByaW50Q1NTID0gJydcclxuICB9ID0ge31cclxuKSB7XHJcbiAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcpXHJcbiAgICByZXR1cm5cclxuICBpZighZnJhbWUpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZVByaW50RnJhbWUgbXVzdCBiZSBwcm92aWRlZCB0aGUgZnJhbWUgZWxlbWVudC4nKVxyXG5cclxuICBjb25zdCB1bmRvVG9wQ1NTID0gdG9wUHJpbnRDU1MgPyBzZXRQcmludENTUyhkb2N1bWVudCwgdG9wUHJpbnRDU1MpIDogKCkgPT4ge31cclxuICBjb25zdCB1bmRvRnJhbWVDU1MgPSBmcmFtZVByaW50Q1NTID8gc2V0UHJpbnRDU1MocmVzb2x2ZURvY3VtZW50KGZyYW1lKSwgZnJhbWVQcmludENTUykgOiAoKSA9PiB7fVxyXG5cclxuXHJcbiAgLy9zZXRTdHlsZXMoZG9jdW1lbnQuYm9keSwgeyBib3JkZXI6ICcxcHggZGFzaGVkIHJlZCAhaW1wb3J0YW50JyB9KVxyXG5cclxuICAvL2NvbnN0IHVuZG9QcmVsaW1GcmFtZVN0eWxlID0gc2V0U3R5bGVzKGZyYW1lLCB7ICd3aWxsLWNoYW5nZSc6ICdwb3NpdGlvbiBkaXNwbGF5IHdpZHRoIGhlaWdodCBtaW4td2lkdGggbWluLWhlaWdodCBtYXgtd2lkdGggbWF4LWhlaWdodCAhaW1wb3J0YW50JyB9KVxyXG5cclxuICBsZXQgdW5kb3MgPSBuZXcgU2V0KClcclxuICBjb25zdCBkaXNwb3NlUHJpbnQgPSBvblByaW50KFxyXG4gICAgeyBwcmVwcmludCgpIHtcclxuICAgICAgICBjb25zdCB7IGNvbnRhaW5lciwgZG9jLCBhbmNlc3RvcnMgfSA9IHNlbGVjdE5vZGVzKGZyYW1lKVxyXG4gICAgICAgIGlmKCFkb2MpXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGRvYyBpbiBmcmFtZS4nKVxyXG5cclxuICAgICAgICBjb25zdCBoZWlnaHRFbGVtZW50ID0gc2VsZWN0SGVpZ2h0RWxlbWVudChkb2MpXHJcbiAgICAgICAgY29uc3Qgd2lkdGhFbGVtZW50ID0gc2VsZWN0V2lkdGhFbGVtZW50KGRvYylcclxuICAgICAgICBpZighaGVpZ2h0RWxlbWVudClcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgaGVpZ2h0IGVsZW1lbnQgaW4gZnJhbWUuJylcclxuICAgICAgICBpZighd2lkdGhFbGVtZW50KVxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB3aWR0aCBlbGVtZW50IGluIGZyYW1lLicpXHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0gc2VsZWN0Q29udGFpbmVyU3R5bGUoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9KVxyXG4gICAgICAgIGNvbnN0IGZyYW1lU3R5bGUgPSBzZWxlY3RGcmFtZVN0eWxlKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSlcclxuICAgICAgICBjb25zdCBmcmFtZUJvZHlTdHlsZSA9IHNlbGVjdEZyYW1lQm9keVN0eWxlKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSlcclxuICAgICAgICBjb25zdCBoZWlnaHRFbGVtZW50U3R5bGUgPSBzZWxlY3RIZWlnaHRFbGVtZW50U3R5bGUoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9KVxyXG4gICAgICAgIGNvbnN0IHdpZHRoRWxlbWVudFN0eWxlID0gc2VsZWN0V2lkdGhFbGVtZW50U3R5bGUoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9KVxyXG4gICAgICAgIGNvbnN0IGFuY2VzdG9yU3R5bGUgPSBzZWxlY3RBbmNlc3RvclN0eWxlKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSlcclxuXHJcblxyXG4gICAgICAgIHVuZG9zID0gbmV3IFNldChcclxuICAgICAgICAgIFsgc2V0U3R5bGVzKGNvbnRhaW5lciwgY29udGFpbmVyU3R5bGUpXHJcbiAgICAgICAgICAsIHNldFN0eWxlcyhmcmFtZSwgZnJhbWVTdHlsZSlcclxuICAgICAgICAgICwgc2V0U3R5bGVzKGRvYy5ib2R5LCBoZWlnaHRFbGVtZW50U3R5bGUpXHJcbiAgICAgICAgICAsIHNldFN0eWxlcyhkb2MuYm9keSwgd2lkdGhFbGVtZW50U3R5bGUpXHJcbiAgICAgICAgICAsIHNldFN0eWxlcyhkb2MuYm9keSwgZnJhbWVCb2R5U3R5bGUpXHJcbiAgICAgICAgICAsIC4uLmFuY2VzdG9ycy5tYXAoKGFuY2VzdG9yKSA9PiBzZXRTdHlsZXMoYW5jZXN0b3IsIGFuY2VzdG9yU3R5bGUpKVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIClcclxuICAgICAgICBjb25zb2xlLmxvZygnLS1wcmVwcmludC0tJywgdW5kb3Muc2l6ZSlcclxuICAgICAgfVxyXG4gICAgLCBwb3N0cHJpbnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJy0tcG9zdHByaW50LS0nLCB1bmRvcy5zaXplKVxyXG4gICAgICAgIGZvcihsZXQgdW5kbyBvZiB1bmRvcykge1xyXG4gICAgICAgICAgdW5kbygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuZG9zLmNsZWFyKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIClcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIGRpc3Bvc2UgKCkge1xyXG4gICAgdW5kb1RvcENTUygpXHJcbiAgICB1bmRvRnJhbWVDU1MoKVxyXG4gICAgdW5kb1N0eWxlcygpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3ROb2RlcyAoZnJhbWUpIHtcclxuICBjb25zdCBjb250YWluZXIgPSBmcmFtZS5wYXJlbnROb2RlXHJcbiAgY29uc3QgZG9jID0gcmVzb2x2ZURvY3VtZW50KGZyYW1lKVxyXG5cclxuICBjb25zdCBhbmNlc3RvcnMgPSBbXVxyXG4gIGxldCBjdXJyZW50ID0gY29udGFpbmVyXHJcbiAgd2hpbGUoY3VycmVudC5wYXJlbnROb2RlKSB7XHJcbiAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlXHJcbiAgICBpZihjdXJyZW50LnN0eWxlKVxyXG4gICAgICBhbmNlc3RvcnMucHVzaChjdXJyZW50KVxyXG4gIH1cclxuICByZXR1cm4geyBjb250YWluZXIsIGRvYywgYW5jZXN0b3JzIH1cclxufVxyXG5cclxuLypcclxub3ZlcmZsb3c6IGhpZGRlbjsgbWluLXdpZHRoOiA5OTBweDsgaGVpZ2h0OiAzODVweDsgd2lkdGg6IDk5MHB4O1xyXG5vdmVyZmxvdzogaGlkZGVuOyBtaW4td2lkdGg6IDM3N3B4ICFpbXBvcnRhbnQ7IGhlaWdodDogMzg1cHg7IHdpZHRoOiA5OTBweDsgcG9zaXRpb246IGZpeGVkICFpbXBvcnRhbnQ7IGRpc3BsYXk6IGlubGluZS1ibG9jayAhaW1wb3J0YW50OyBtaW4taGVpZ2h0OiAyODZweCAhaW1wb3J0YW50O1xyXG5vdmVyZmxvdzogaGlkZGVuOyBtaW4td2lkdGg6IDk5MHB4ICFpbXBvcnRhbnQ7IGhlaWdodDogMzg1cHg7IHdpZHRoOiA5OTBweDtcclxuKi9cclxuXHJcbmZ1bmN0aW9uIHJlc29sdmVEb2N1bWVudChvYmopIHtcclxuICBpZihvYmouY29udGVudERvY3VtZW50KVxyXG4gICAgcmV0dXJuIG9iai5jb250ZW50RG9jdW1lbnRcclxuICBlbHNlIGlmKG9iai5jb250ZW50V2luZG93KVxyXG4gICAgcmV0dXJuIG9iai5jb250ZW50V2luZG93LmNvbnRlbnREb2N1bWVudFxyXG4gIGVsc2UgaWYob2JqLmRvY3VtZW50KVxyXG4gICAgcmV0dXJuIG9iai5kb2N1bWVudFxyXG4gIHRocm93IG5ldyBFcnJvcigncmVzb2x2ZURvY3VtZW50IGZvdW5kIG5vIGRvY3VtZW50IG9iamVjdCcpXHJcbn1cclxuXHJcbmNvbnN0IHN0eWxlc0lEID0gJ3VzZS1wcmludC1mcmFtZS1zdHlsZXMnXHJcbmZ1bmN0aW9uIHNldFByaW50Q1NTKGRvYywgY3NzKSB7XHJcbiAgaWYoZG9jLmdldEVsZW1lbnRCeUlkKHN0eWxlc0lEKSlcclxuICAgIHRocm93IG5ldyBFcnJvcignc2V0UHJpbnRDU1Mgc2hvdWxkIG5vdCBiZSByZWdpc3RlcmVkIHR3aWNlIG9uIHRoZSBzYW1lIGRvY3VtZW50IC0gY2FsbCB1bmRvUHJpbnRDU1MgZmlyc3QuJylcclxuICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxyXG4gIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGVzSUQpXHJcbiAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpXHJcbiAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCAncHJpbnQnKVxyXG4gIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBjc3NcclxuICBkb2MuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHVuZG9QcmludENTUyAoKSB7XHJcbiAgICBkb2MuaGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0U3R5bGVzIChlbGVtZW50LCBzdHlsZXMpIHtcclxuICBjb25zdCBwcmV2U3R5bGVzID0gT2JqZWN0LmVudHJpZXMoc3R5bGVzKS5yZWR1Y2UoKHByZXYsIFsga2V5LCBuZXh0IF0pID0+IHtcclxuICAgIGNvbnN0IHByb3AgPSB7IHZhbHVlOiBlbGVtZW50LnN0eWxlLmdldFByb3BlcnR5VmFsdWUoa2V5KSwgcHJpb3JpdHk6IGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eShrZXkpIH1cclxuICAgIGNvbnNvbGUuaW5mbygnU0VUIFNUWUxFUycsIGtleSwgbmV4dCwgcHJvcClcclxuICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSBwcm9wLnZhbHVlID8gc2VyaWFsaXplQ1NTUHJvcGVydHkocHJvcCkgOiBudWxsXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJldiwga2V5LCB7IHZhbHVlOiBzZXJpYWxpemVkLCBlbnVtZXJhYmxlOiB0cnVlIH0pXHJcbiAgICBpZihuZXh0KSB7XHJcbiAgICAgIGNvbnN0IHsgdmFsdWUsIHByaW9yaXR5IH0gPSBwYXJzZUNTU1Byb3BlcnR5KG5leHQpXHJcbiAgICAgIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgcHJpb3JpdHkpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleSlcclxuICAgIH1cclxuICAgIHJldHVybiBwcmV2XHJcbiAgfSwge30pXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHVuZG9TdHlsZXMgKCkge1xyXG4gICAgc2V0U3R5bGVzIChlbGVtZW50LCBwcmV2U3R5bGVzKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMSIsInJlcXVpcmUkJDAiLCJpc09iamVjdCIsImRvY3VtZW50IiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJkUCIsImdsb2JhbCIsImhpZGUiLCIkZXhwb3J0IiwidG9TdHJpbmciLCJkZWZpbmVkIiwidG9JbnRlZ2VyIiwibWluIiwidG9JT2JqZWN0IiwiaGFzIiwiSUVfUFJPVE8iLCJlbnVtQnVnS2V5cyIsImFuT2JqZWN0IiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDQiLCJQUk9UT1RZUEUiLCJjcmVhdGUiLCJzZXRUb1N0cmluZ1RhZyIsInJlcXVpcmUkJDkiLCJyZXF1aXJlJCQ4IiwicmVxdWlyZSQkNyIsInJlcXVpcmUkJDYiLCJJdGVyYXRvcnMiLCJjb3JlIiwiTElCUkFSWSIsIndrc0V4dCIsImRlZmluZVByb3BlcnR5IiwiZ2V0S2V5cyIsImNvZiIsIiRrZXlzIiwiZ09QTiIsInBJRSIsImNyZWF0ZURlc2MiLCJ0b1ByaW1pdGl2ZSIsIklFOF9ET01fREVGSU5FIiwiZ09QRCIsInJlcXVpcmUkJDI5IiwicmVxdWlyZSQkMjgiLCJyZXF1aXJlJCQyNyIsInJlcXVpcmUkJDI2IiwicmVkZWZpbmUiLCJyZXF1aXJlJCQyNSIsInJlcXVpcmUkJDI0IiwicmVxdWlyZSQkMjMiLCJzaGFyZWQiLCJyZXF1aXJlJCQyMiIsInJlcXVpcmUkJDIxIiwidWlkIiwicmVxdWlyZSQkMjAiLCJyZXF1aXJlJCQxOSIsInJlcXVpcmUkJDE4IiwicmVxdWlyZSQkMTciLCJyZXF1aXJlJCQxNiIsInJlcXVpcmUkJDE1IiwiaXNBcnJheSIsInJlcXVpcmUkJDE0IiwicmVxdWlyZSQkMTMiLCJyZXF1aXJlJCQxMiIsInJlcXVpcmUkJDExIiwicmVxdWlyZSQkMTAiLCJPYmplY3RQcm90byIsImkiLCJvblByaW50IiwicHJlcHJpbnQiLCJwb3N0cHJpbnQiLCJ3aW5kb3ciLCJvbmJlZm9yZXByaW50IiwidW5kZWZpbmVkIiwib25hZnRlcnByaW50IiwiZGlzcG9zZSIsIm1xbExpc3RlbmVyIiwibXFsIiwibWF0Y2hlcyIsIm1hdGNoTWVkaWEiLCJhZGRMaXN0ZW5lciIsImRpc3Bvc2VNZWRpYSIsInJlbW92ZUxpc3RlbmVyIiwiVEFHIiwiSVRFUkFUT1IiLCJjbGFzc29mIiwiaXNFbnVtIiwiJGRlZmluZVByb3BlcnR5IiwiY3R4IiwidG9PYmplY3QiLCJ0b0xlbmd0aCIsIkRFU0NSSVBUT1JTIiwic3RlcCIsImZhc3RLZXkiLCJTUEVDSUVTIiwiSU9iamVjdCIsInJlZGVmaW5lQWxsIiwiZm9yT2YiLCJhbkluc3RhbmNlIiwiZnJvbSIsInN0cmlwcGVyIiwicGFyc2VDU1NQcm9wZXJ0eSIsInJhdyIsIkVycm9yIiwiZXhlYyIsIm1hdGNoIiwidmFsdWUiLCJwcmlvcml0eSIsInNlcmlhbGl6ZUNTU1Byb3BlcnR5IiwicHJvcCIsInVzZVByaW50RnJhbWUiLCJmcmFtZSIsInNlbGVjdEhlaWdodEVsZW1lbnQiLCJkb2MiLCJxdWVyeVNlbGVjdG9yIiwiYm9keSIsInNlbGVjdFdpZHRoRWxlbWVudCIsInNlbGVjdENvbnRhaW5lclN0eWxlIiwiaGVpZ2h0RWxlbWVudCIsIndpZHRoRWxlbWVudCIsInBvc2l0aW9uIiwib3ZlcmZsb3ciLCJzZWxlY3RGcmFtZVN0eWxlIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJ0b3AiLCJtYXJnaW4iLCJzZWxlY3RIZWlnaHRFbGVtZW50U3R5bGUiLCJzZWxlY3RXaWR0aEVsZW1lbnRTdHlsZSIsInNlbGVjdEZyYW1lQm9keVN0eWxlIiwicGFkZGluZyIsInNlbGVjdEFuY2VzdG9yU3R5bGUiLCJkaXNwbGF5IiwidG9wUHJpbnRDU1MiLCJmcmFtZVByaW50Q1NTIiwidW5kb1RvcENTUyIsInNldFByaW50Q1NTIiwidW5kb0ZyYW1lQ1NTIiwicmVzb2x2ZURvY3VtZW50IiwidW5kb3MiLCJkaXNwb3NlUHJpbnQiLCJzZWxlY3ROb2RlcyIsImNvbnRhaW5lciIsImFuY2VzdG9ycyIsImNvbnRhaW5lclN0eWxlIiwiZnJhbWVTdHlsZSIsImZyYW1lQm9keVN0eWxlIiwiaGVpZ2h0RWxlbWVudFN0eWxlIiwid2lkdGhFbGVtZW50U3R5bGUiLCJhbmNlc3RvclN0eWxlIiwic2V0U3R5bGVzIiwibWFwIiwiYW5jZXN0b3IiLCJsb2ciLCJzaXplIiwidW5kbyIsImNsZWFyIiwicGFyZW50Tm9kZSIsImN1cnJlbnQiLCJzdHlsZSIsInB1c2giLCJvYmoiLCJjb250ZW50RG9jdW1lbnQiLCJjb250ZW50V2luZG93Iiwic3R5bGVzSUQiLCJjc3MiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJ1bmRvUHJpbnRDU1MiLCJyZW1vdmVDaGlsZCIsImVsZW1lbnQiLCJzdHlsZXMiLCJwcmV2U3R5bGVzIiwicmVkdWNlIiwicHJldiIsImtleSIsIm5leHQiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiZ2V0UHJvcGVydHlQcmlvcml0eSIsImluZm8iLCJzZXJpYWxpemVkIiwiZW51bWVyYWJsZSIsInNldFByb3BlcnR5IiwicmVtb3ZlUHJvcGVydHkiLCJ1bmRvU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUk7SUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsY0FBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLE9BQU8sS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUMxRDs7QUNMRDtBQUNBLFlBQWMsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMzQixHQUFHLEVBQUUsSUFBSSxTQUFTLENB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LEdBQUcsU0FBUztRQUM3QyxPQUFPLEdBQUcsS0FBSyxLQUFLLFNBQVM7UUFDN0IsS0FBSyxLQUFLLENBQUM7UUFDWCxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7SUFDbkMsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHRCxLQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFFdEUsR0FBRyxNQUFNLElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztNQUM3RCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDckYsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDeEc7S0FDRixNQUFNO01BQ0wsTUFBTSxHQUFHRSxVQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDbEQsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxD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QyxJQUFJLEtBQUssR0FBR0UsU0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQztFQUNoQyxHQUFHLEtBQUssS0FBSyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDOztFQUV2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxQyxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxDQUFDO0dBQ2hDO0NBQ0YsQ0FBQzs7QUFFRixxQkFBYyxHQUFHO0VBQ2YsY0FBYyxFQUFFLFNBQVMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0lBQ3BELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxRQUFRLENBQUM7TUFDdEMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUd2RSxRQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7TUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7TUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNmLEdBQUcsUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDckUsQ0FBQyxDQUFDO0lBQ0gsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7OztNQUd2QixLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7UUFDckIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLElB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
