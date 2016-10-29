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

function serializeCSSProperty(prop) {
  if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object' || !prop.value) throw new Error('serializeCSSProperty requires an object property with value and priority (optional) keys.');
  var value = prop.value,
      priority = prop.priority;

  return priority ? value + ' !' + priority : value;
}

function round(num) {
  return Math.floor(num * 100) / 100;
}
var scaleToWidth = 700;
function getScale(width) {
  return round(scaleToWidth / width);
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

    return { position: 'absolute !important',
      display: 'inline !important'
      /*
      , width: 'unset !important'
      , height: 'unset !important'
      */
      , width: scaleToWidth + 'px !important',
      height: '4000px !important' // `${descaleHeight(heightElement.offsetHeight, getScale(widthElement.offsetWidth))}px !important`
      //, height: '100% !important' //`${heightElement.offsetHeight}px !important`
      /*
      , zoom: `${getScale(widthElement.offsetWidth)} !important`
      */

      /*
      , 'min-width': 'unset !important'
      , 'min-height': 'unset !important'
      , 'max-width': 'unset !important'
      */
      //, 'max-height': '100vh !important'
      , top: '0px !important',
      left: '0px !important',
      right: '0px !important',
      margin: '0px 0px 0px 0px !important'
      //, bottom: '0px !important'
      , border: '0 !important'
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
      display: 'inline-block !important'
      /*
      , transform: `scale(${getScale(widthElement.offsetWidth)}) !important`
      , 'transform-origin': 'left top !important'
      */
      , visibility: 'visible !important',
      width: widthElement.offsetWidth + 'px !important',
      height: heightElement.offsetHeight + 'px !important',
      'min-height': '100% !important',
      transform: 'scale(' + getScale(widthElement.offsetWidth) + ') !important',
      'transform-origin': 'left top !important'
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
      border: '0 !important'
      //, border: '0px !important'
      , margin: '0px !important',
      padding: '0px !important',
      'padding-top': '0px !important',
      'padding-bottom': '0px !important',
      overflow: 'auto !important',
      'box-shadow': 'none !important',
      'background-color': 'transparent !important',
      'border-radius': '0 !important'
    };
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
      topPrintCSS = _ref$topPrintCSS === undefined ? '\n* {\n  overflow: visible !important;\n}\nbody * {\n  display: none !important;\n  position: unset !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  width: 0 !important;\n}\n' : _ref$topPrintCSS,
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

      frame.setAttribute('width', '0');
      frame.setAttribute('height', '0');
      frame.contentWindow.focus();

      var i = doc.createElement('input');
      i.style.display = 'none';
      doc.body.appendChild(i);
      i.focus();
      doc.body.removeChild(i);

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

      undos = new _Set([setStyles(container, containerStyle), setStyles(frame, frameStyle), setStyles(heightElement, heightElementStyle), setStyles(widthElement, widthElementStyle), setStyles(doc.body, frameBodyStyle)].concat(_toConsumableArray(ancestors.map(function (ancestor) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanMiLCIuLi9zcmMvb25QcmludC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2VudHJpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9lbnRyaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnNldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zZXQuanMiLCIuLi9zcmMvdXRpbHMvcGFyc2VDU1NQcm9wZXJ0eS5qcyIsIi4uL3NyYy91dGlscy9zZXJpYWxpemVDU1NQcm9wZXJ0eS5qcyIsIi4uL3NyYy91c2VQcmludEZyYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7IiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sOyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvblByaW50KHsgcHJlcHJpbnQsIHBvc3RwcmludCB9ID0ge30pIHtcclxuICBpZih0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JylcclxuICAgIHJldHVyblxyXG4gIGlmKHdpbmRvdy5vbmJlZm9yZXByaW50ICE9PSB1bmRlZmluZWQgJiYgd2luZG93Lm9uYWZ0ZXJwcmludCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpZihwcmVwcmludClcclxuICAgICAgd2luZG93Lm9uYmVmb3JlcHJpbnQgPSBwcmVwcmludFxyXG4gICAgaWYocG9zdHByaW50KVxyXG4gICAgICB3aW5kb3cub25hZnRlcnByaW50ID0gcG9zdHByaW50XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZGlzcG9zZSAoKSB7XHJcbiAgICAgIGlmKHByZXByaW50KVxyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXByaW50ID0gbnVsbFxyXG4gICAgICBpZihwb3N0cHJpbnQpXHJcbiAgICAgICAgd2luZG93Lm9uYWZ0ZXJwcmludCA9IG51bGxcclxuICAgIH1cclxuICB9IGVsc2UgaWYocHJlcHJpbnQgfHwgcG9zdHByaW50KSB7XHJcbiAgICBmdW5jdGlvbiBtcWxMaXN0ZW5lciAobXFsKSB7XHJcbiAgICAgIGlmKG1xbC5tYXRjaGVzICYmIHByZXByaW50KVxyXG4gICAgICAgIHByZXByaW50KClcclxuICAgICAgZWxzZSBpZighbXFsLm1hdGNoZXMgJiYgcG9zdHByaW50KVxyXG4gICAgICAgIHBvc3RwcmludCgpXHJcbiAgICB9XHJcbiAgICBjb25zdCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYSgncHJpbnQnKVxyXG4gICAgbXFsLmFkZExpc3RlbmVyKG1xbExpc3RlbmVyKVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRpc3Bvc2VNZWRpYSAoKSB7XHJcbiAgICAgIG1xbC5yZW1vdmVMaXN0ZW5lcihtcWxMaXN0ZW5lcilcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuICgpID0+IHt9XHJcbiAgfVxyXG59XHJcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59OyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpOyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpOyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgaXNFbnVtICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzRW50cmllcyl7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdChpdClcbiAgICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpe1xuICAgICAgcmVzdWx0LnB1c2goaXNFbnRyaWVzID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9O1xufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpe1xuICAgIHJldHVybiAkZW50cmllcyhpdCk7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZW50cmllczsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2VudHJpZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTsiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMsIHNhZmUpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpe1xuICAgIGlmKHNhZmUgJiYgdGFyZ2V0W2tleV0pdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgLCBCUkVBSyAgICAgICA9IHt9XG4gICwgUkVUVVJOICAgICAgPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyAgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOOyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGlzQXJyYXkgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIFNQRUNJRVMgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCl7XG4gIHZhciBDO1xuICBpZihpc0FycmF5KG9yaWdpbmFsKSl7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKUMgPSB1bmRlZmluZWQ7XG4gICAgaWYoaXNPYmplY3QoQykpe1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZihDID09PSBudWxsKUMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59OyIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwsIGxlbmd0aCl7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59OyIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSwgJGNyZWF0ZSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVhcbiAgICAsIGNyZWF0ZSAgICAgICAgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QoJHRoaXMpXG4gICAgICAsIHNlbGYgICA9IElPYmplY3QoTylcbiAgICAgICwgZiAgICAgID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBtZXRhICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGZhaWxzICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGZvck9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBhbkluc3RhbmNlICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgZWFjaCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGFyZ2V0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSwgJ19jJyk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgIGVhY2goJ2FkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTicuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgS0VZKTtcbiAgICAgICAgaWYoIUlTX0FEREVSICYmIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpKXJldHVybiBLRVkgPT0gJ2dldCcgPyB1bmRlZmluZWQgOiBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NbS0VZXShhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gSVNfQURERVIgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoJ3NpemUnIGluIHByb3RvKWRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpOyIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnU2V0Jywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpfSk7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnNldCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcuc2V0LnRvLWpzb24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlNldDsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc2V0XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiY29uc3Qgc3RyaXBwZXIgPSAvXiAqKFswLTlhLXpcXC1cXC4oKSUgXSpbMC05YS16XFwtXFwuKCklXSlbICFdKihbYS16XSspPy9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlQ1NTUHJvcGVydHkocmF3KSB7XHJcbiAgaWYodHlwZW9mIHJhdyAhPT0gJ3N0cmluZycpXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhcnNlQ1NTUHJvcGVydHkgZXhwZWN0cyBhIHN0cmluZyBDU1MgdmFsdWUgaW5wdXQuJylcclxuXHJcbiAgY29uc3QgWyBtYXRjaCwgdmFsdWUsIHByaW9yaXR5ID0gJycgXSA9IHN0cmlwcGVyLmV4ZWMocmF3KSB8fCBbXVxyXG4gIGlmKCF2YWx1ZSlcclxuICAgIHRocm93IG5ldyBFcnJvcihgcGFyc2VDU1NQcm9wZXJ0eSBjb3VsZCBub3QgcGFyc2UgYSBwcm9wZXJ0eSB2YWx1ZSBmcm9tICcke3Jhd30nYClcclxuICByZXR1cm4geyB2YWx1ZSwgcHJpb3JpdHkgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlcmlhbGl6ZUNTU1Byb3BlcnR5IChwcm9wKSB7XHJcbiAgaWYodHlwZW9mIHByb3AgIT09ICdvYmplY3QnIHx8ICFwcm9wLnZhbHVlKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXJpYWxpemVDU1NQcm9wZXJ0eSByZXF1aXJlcyBhbiBvYmplY3QgcHJvcGVydHkgd2l0aCB2YWx1ZSBhbmQgcHJpb3JpdHkgKG9wdGlvbmFsKSBrZXlzLicpXHJcbiAgY29uc3QgeyB2YWx1ZSwgcHJpb3JpdHkgfSA9IHByb3BcclxuICByZXR1cm4gcHJpb3JpdHkgPyBgJHt2YWx1ZX0gISR7cHJpb3JpdHl9YCA6IHZhbHVlXHJcbn1cclxuIiwiaW1wb3J0IG9uUHJpbnQgZnJvbSAnLi9vblByaW50J1xyXG5pbXBvcnQgcGFyc2VDU1NQcm9wZXJ0eSBmcm9tICcuL3V0aWxzL3BhcnNlQ1NTUHJvcGVydHknXHJcbmltcG9ydCBzZXJpYWxpemVDU1NQcm9wZXJ0eSBmcm9tICcuL3V0aWxzL3NlcmlhbGl6ZUNTU1Byb3BlcnR5J1xyXG5cclxuZnVuY3Rpb24gcm91bmQobnVtKSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogMTAwKSAvIDEwMFxyXG59XHJcbmNvbnN0IHNjYWxlVG9XaWR0aCA9IDcwMFxyXG5mdW5jdGlvbiBnZXRTY2FsZSAod2lkdGgpIHtcclxuICByZXR1cm4gcm91bmQoc2NhbGVUb1dpZHRoIC8gd2lkdGgpXHJcbn1cclxuZnVuY3Rpb24gZGVzY2FsZUhlaWdodCAoaGVpZ2h0LCBzY2FsZUZhY3Rvcikge1xyXG4gIHJldHVybiBoZWlnaHQgKiBzY2FsZUZhY3RvclxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVByaW50RnJhbWUoIGZyYW1lXHJcbiwgeyBzZWxlY3RIZWlnaHRFbGVtZW50ID0gKGRvYykgPT4gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlmcmFtZS1oZWlnaHRdJykgfHwgZG9jLmJvZHlcclxuICAsIHNlbGVjdFdpZHRoRWxlbWVudCA9IChkb2MpID0+IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZnJhbWUtd2lkdGhdJykgfHwgZG9jLmJvZHlcclxuICAsIHNlbGVjdENvbnRhaW5lclN0eWxlID0gKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSA9IHt9KSA9PiAoXHJcbiAgICAgIHsgcG9zaXRpb246ICdhYnNvbHV0ZSAhaW1wb3J0YW50J1xyXG4gICAgICAsIGRpc3BsYXk6ICdpbmxpbmUgIWltcG9ydGFudCdcclxuICAgICAgLypcclxuICAgICAgLCB3aWR0aDogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgaGVpZ2h0OiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgKi9cclxuICAgICAgLCB3aWR0aDogYCR7c2NhbGVUb1dpZHRofXB4ICFpbXBvcnRhbnRgXHJcbiAgICAgICwgaGVpZ2h0OiAnNDAwMHB4ICFpbXBvcnRhbnQnLy8gYCR7ZGVzY2FsZUhlaWdodChoZWlnaHRFbGVtZW50Lm9mZnNldEhlaWdodCwgZ2V0U2NhbGUod2lkdGhFbGVtZW50Lm9mZnNldFdpZHRoKSl9cHggIWltcG9ydGFudGBcclxuICAgICAgLy8sIGhlaWdodDogJzEwMCUgIWltcG9ydGFudCcgLy9gJHtoZWlnaHRFbGVtZW50Lm9mZnNldEhlaWdodH1weCAhaW1wb3J0YW50YFxyXG4gICAgICAvKlxyXG4gICAgICAsIHpvb206IGAke2dldFNjYWxlKHdpZHRoRWxlbWVudC5vZmZzZXRXaWR0aCl9ICFpbXBvcnRhbnRgXHJcbiAgICAgICovXHJcblxyXG4gICAgICAvKlxyXG4gICAgICAsICdtaW4td2lkdGgnOiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgLCAnbWluLWhlaWdodCc6ICd1bnNldCAhaW1wb3J0YW50J1xyXG4gICAgICAsICdtYXgtd2lkdGgnOiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgKi9cclxuICAgICAgLy8sICdtYXgtaGVpZ2h0JzogJzEwMHZoICFpbXBvcnRhbnQnXHJcbiAgICAgICwgdG9wOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgbGVmdDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIHJpZ2h0OiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgbWFyZ2luOiAnMHB4IDBweCAwcHggMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgIC8vLCBib3R0b206ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBib3JkZXI6ICcwICFpbXBvcnRhbnQnXHJcbiAgICAgIC8vLCBib3JkZXI6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCBvdmVyZmxvdzogJ3Zpc2libGUgIWltcG9ydGFudCdcclxuICAgICAgfVxyXG4gICAgLypcclxuICAgICAgLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAsIGhlaWdodDogJzEwMCUnXHJcbiAgICAgICwgd2lkdGg6ICcxMDAlJ1xyXG4gICAgICAqL1xyXG4gICAgKVxyXG5cclxuICAsIHNlbGVjdEZyYW1lU3R5bGUgPSAoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9ID0ge30pID0+IHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB7IHBvc2l0aW9uOiAnYWJzb2x1dGUgIWltcG9ydGFudCdcclxuICAgICAgICAsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2sgIWltcG9ydGFudCdcclxuICAgICAgICAvKlxyXG4gICAgICAgICwgdHJhbnNmb3JtOiBgc2NhbGUoJHtnZXRTY2FsZSh3aWR0aEVsZW1lbnQub2Zmc2V0V2lkdGgpfSkgIWltcG9ydGFudGBcclxuICAgICAgICAsICd0cmFuc2Zvcm0tb3JpZ2luJzogJ2xlZnQgdG9wICFpbXBvcnRhbnQnXHJcbiAgICAgICAgKi9cclxuICAgICAgICAsIHZpc2liaWxpdHk6ICd2aXNpYmxlICFpbXBvcnRhbnQnXHJcbiAgICAgICAgLCB3aWR0aDogYCR7d2lkdGhFbGVtZW50Lm9mZnNldFdpZHRofXB4ICFpbXBvcnRhbnRgXHJcbiAgICAgICAgLCBoZWlnaHQ6IGAke2hlaWdodEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4ICFpbXBvcnRhbnRgXHJcbiAgICAgICAgLCAnbWluLWhlaWdodCc6ICcxMDAlICFpbXBvcnRhbnQnXHJcbiAgICAgICAgLCB0cmFuc2Zvcm06IGBzY2FsZSgke2dldFNjYWxlKHdpZHRoRWxlbWVudC5vZmZzZXRXaWR0aCl9KSAhaW1wb3J0YW50YFxyXG4gICAgICAgICwgJ3RyYW5zZm9ybS1vcmlnaW4nOiAnbGVmdCB0b3AgIWltcG9ydGFudCdcclxuICAgICAgICAvKlxyXG4gICAgICAgICwgJ21pbi13aWR0aCc6ICd1bnNldCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgJ21pbi1oZWlnaHQnOiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgICAsICdtYXgtd2lkdGgnOiAndW5zZXQgIWltcG9ydGFudCdcclxuICAgICAgICAsICdtYXgtaGVpZ2h0JzogJ3Vuc2V0ICFpbXBvcnRhbnQnXHJcbiAgICAgICAgKi9cclxuICAgICAgICAsIHRvcDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgYm90dG9tOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICAgLCBsZWZ0OiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICAgLCByaWdodDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgYm9yZGVyOiAnMCAhaW1wb3J0YW50J1xyXG4gICAgICAgIC8vLCBib3JkZXI6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgICAsIG1hcmdpbjogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgcGFkZGluZzogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgJ3BhZGRpbmctdG9wJzogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgJ3BhZGRpbmctYm90dG9tJzogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgb3ZlcmZsb3c6ICdhdXRvICFpbXBvcnRhbnQnXHJcbiAgICAgICAgLCAnYm94LXNoYWRvdyc6ICdub25lICFpbXBvcnRhbnQnXHJcbiAgICAgICAgLCAnYmFja2dyb3VuZC1jb2xvcic6ICd0cmFuc3BhcmVudCAhaW1wb3J0YW50J1xyXG4gICAgICAgICwgJ2JvcmRlci1yYWRpdXMnOiAnMCAhaW1wb3J0YW50J1xyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgICAvKlxyXG4gICAgICAsICdtaW4taGVpZ2h0JzogYCR7aGVpZ2h0RWxlbWVudC5vZmZzZXRIZWlnaHR9cHggIWltcG9ydGFudGBcclxuICAgICAgLCAnbWluLXdpZHRoJzogYCR7d2lkdGhFbGVtZW50Lm9mZnNldFdpZHRofXB4ICFpbXBvcnRhbnRgXHJcbiAgICAgICovXHJcbiAgICAgIC8qXHJcbiAgICAgIC5wcmludC10YXJnZXQge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAvKiBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDtcclxuICB0b3A6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgb3ZlcmZsb3c6IHZpc2libGU7XHJcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XHJcbiAgd2lkdGg6IDE1MDBweDtcclxuICAgICAgYm9yZGVyOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MHB4O2hlaWdodDowcHg7Ym90dG9tOjBweDtsZWZ0OjBweDtcclxuICAgICAgKi9cclxuICAgIH1cclxuICAgICwgc2VsZWN0SGVpZ2h0RWxlbWVudFN0eWxlID0gKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSA9IHt9KSA9PiAoXHJcbiAgICAgIHt9XHJcbiAgICApXHJcbiAgLCBzZWxlY3RXaWR0aEVsZW1lbnRTdHlsZSA9ICh7IGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50IH0gPSB7fSkgPT4gKFxyXG4gICAgICB7fVxyXG4gICAgKVxyXG4gICwgc2VsZWN0RnJhbWVCb2R5U3R5bGUgPSAoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9ID0ge30pID0+IChcclxuICAgICAgeyBtYXJnaW46ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLy8sICdtYXJnaW4tcmlnaHQnOiAnNDBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIHBhZGRpbmc6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLy8sICdwYWRkaW5nLXJpZ2h0JzogJzMwcHggIWltcG9ydGFudCdcclxuICAgICAgLCAncGFkZGluZy10b3AnOiAnMHB4ICFpbXBvcnRhbnQnXHJcbiAgICAgICwgJ3BhZGRpbmctYm90dG9tJzogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsICdwb3NpdGlvbic6ICdmaXhlZCAhaW1wb3J0YW50J1xyXG4gICAgICAsIHRvcDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIGJvdHRvbTogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIGxlZnQ6ICcwcHggIWltcG9ydGFudCdcclxuICAgICAgLCByaWdodDogJzBweCAhaW1wb3J0YW50J1xyXG4gICAgICAsIG92ZXJmbG93OiAndmlzaWJsZSAhaW1wb3J0YW50J1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgLCBzZWxlY3RBbmNlc3RvclN0eWxlID0gKHsgZG9jLCBoZWlnaHRFbGVtZW50LCB3aWR0aEVsZW1lbnQgfSA9IHt9KSA9PiAoXHJcbiAgICAgIHsgZGlzcGxheTogJ2lubGluZS1ibG9jayAhaW1wb3J0YW50J1xyXG4gICAgICAsIHBvc2l0aW9uOiAnc3RhdGljICFpbXBvcnRhbnQnXHJcbiAgICAgICwgb3ZlcmZsb3c6ICd2aXNpYmxlICFpbXBvcnRhbnQnXHJcbiAgICAgIH1cclxuICAgIClcclxuICAsIHRvcFByaW50Q1NTID0gYFxyXG4qIHtcclxuICBvdmVyZmxvdzogdmlzaWJsZSAhaW1wb3J0YW50O1xyXG59XHJcbmJvZHkgKiB7XHJcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIHBvc2l0aW9uOiB1bnNldCAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbjogMCAhaW1wb3J0YW50O1xyXG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxuICB3aWR0aDogMCAhaW1wb3J0YW50O1xyXG59XHJcbmBcclxuICAsIGZyYW1lUHJpbnRDU1MgPSAnJ1xyXG4gIH0gPSB7fVxyXG4pIHtcclxuICBpZih0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JylcclxuICAgIHJldHVyblxyXG4gIGlmKCFmcmFtZSlcclxuICAgIHRocm93IG5ldyBFcnJvcigndXNlUHJpbnRGcmFtZSBtdXN0IGJlIHByb3ZpZGVkIHRoZSBmcmFtZSBlbGVtZW50LicpXHJcblxyXG4gIGNvbnN0IHVuZG9Ub3BDU1MgPSB0b3BQcmludENTUyA/IHNldFByaW50Q1NTKGRvY3VtZW50LCB0b3BQcmludENTUykgOiAoKSA9PiB7fVxyXG4gIGNvbnN0IHVuZG9GcmFtZUNTUyA9IGZyYW1lUHJpbnRDU1MgPyBzZXRQcmludENTUyhyZXNvbHZlRG9jdW1lbnQoZnJhbWUpLCBmcmFtZVByaW50Q1NTKSA6ICgpID0+IHt9XHJcblxyXG5cclxuICAvL3NldFN0eWxlcyhkb2N1bWVudC5ib2R5LCB7IGJvcmRlcjogJzFweCBkYXNoZWQgcmVkICFpbXBvcnRhbnQnIH0pXHJcblxyXG4gIC8vY29uc3QgdW5kb1ByZWxpbUZyYW1lU3R5bGUgPSBzZXRTdHlsZXMoZnJhbWUsIHsgJ3dpbGwtY2hhbmdlJzogJ3Bvc2l0aW9uIGRpc3BsYXkgd2lkdGggaGVpZ2h0IG1pbi13aWR0aCBtaW4taGVpZ2h0IG1heC13aWR0aCBtYXgtaGVpZ2h0ICFpbXBvcnRhbnQnIH0pXHJcblxyXG4gIGxldCB1bmRvcyA9IG5ldyBTZXQoKVxyXG4gIGNvbnN0IGRpc3Bvc2VQcmludCA9IG9uUHJpbnQoXHJcbiAgICB7IHByZXByaW50KCkge1xyXG5cclxuICAgICAgICBjb25zdCB7IGNvbnRhaW5lciwgZG9jLCBhbmNlc3RvcnMgfSA9IHNlbGVjdE5vZGVzKGZyYW1lKVxyXG4gICAgICAgIGZyYW1lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMCcpXHJcbiAgICAgICAgZnJhbWUuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMCcpXHJcbiAgICAgICAgZnJhbWUuY29udGVudFdpbmRvdy5mb2N1cygpXHJcblxyXG4gICAgICAgIGNvbnN0IGkgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgICAgIGkuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGkpXHJcbiAgICAgICAgaS5mb2N1cygpXHJcbiAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoaSlcclxuXHJcbiAgICAgICAgaWYoIWRvYylcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgZG9jIGluIGZyYW1lLicpXHJcblxyXG4gICAgICAgIGNvbnN0IGhlaWdodEVsZW1lbnQgPSBzZWxlY3RIZWlnaHRFbGVtZW50KGRvYylcclxuICAgICAgICBjb25zdCB3aWR0aEVsZW1lbnQgPSBzZWxlY3RXaWR0aEVsZW1lbnQoZG9jKVxyXG4gICAgICAgIGlmKCFoZWlnaHRFbGVtZW50KVxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBoZWlnaHQgZWxlbWVudCBpbiBmcmFtZS4nKVxyXG4gICAgICAgIGlmKCF3aWR0aEVsZW1lbnQpXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHdpZHRoIGVsZW1lbnQgaW4gZnJhbWUuJylcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyU3R5bGUgPSBzZWxlY3RDb250YWluZXJTdHlsZSh7IGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50IH0pXHJcbiAgICAgICAgY29uc3QgZnJhbWVTdHlsZSA9IHNlbGVjdEZyYW1lU3R5bGUoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9KVxyXG4gICAgICAgIGNvbnN0IGZyYW1lQm9keVN0eWxlID0gc2VsZWN0RnJhbWVCb2R5U3R5bGUoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9KVxyXG4gICAgICAgIGNvbnN0IGhlaWdodEVsZW1lbnRTdHlsZSA9IHNlbGVjdEhlaWdodEVsZW1lbnRTdHlsZSh7IGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50IH0pXHJcbiAgICAgICAgY29uc3Qgd2lkdGhFbGVtZW50U3R5bGUgPSBzZWxlY3RXaWR0aEVsZW1lbnRTdHlsZSh7IGRvYywgaGVpZ2h0RWxlbWVudCwgd2lkdGhFbGVtZW50IH0pXHJcbiAgICAgICAgY29uc3QgYW5jZXN0b3JTdHlsZSA9IHNlbGVjdEFuY2VzdG9yU3R5bGUoeyBkb2MsIGhlaWdodEVsZW1lbnQsIHdpZHRoRWxlbWVudCB9KVxyXG5cclxuXHJcbiAgICAgICAgdW5kb3MgPSBuZXcgU2V0KFxyXG4gICAgICAgICAgWyBzZXRTdHlsZXMoY29udGFpbmVyLCBjb250YWluZXJTdHlsZSlcclxuICAgICAgICAgICwgc2V0U3R5bGVzKGZyYW1lLCBmcmFtZVN0eWxlKVxyXG4gICAgICAgICAgLCBzZXRTdHlsZXMoaGVpZ2h0RWxlbWVudCwgaGVpZ2h0RWxlbWVudFN0eWxlKVxyXG4gICAgICAgICAgLCBzZXRTdHlsZXMod2lkdGhFbGVtZW50LCB3aWR0aEVsZW1lbnRTdHlsZSlcclxuICAgICAgICAgICwgc2V0U3R5bGVzKGRvYy5ib2R5LCBmcmFtZUJvZHlTdHlsZSlcclxuICAgICAgICAgICwgLi4uYW5jZXN0b3JzLm1hcCgoYW5jZXN0b3IpID0+IHNldFN0eWxlcyhhbmNlc3RvciwgYW5jZXN0b3JTdHlsZSkpXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCctLXByZXByaW50LS0nLCB1bmRvcy5zaXplKVxyXG4gICAgICB9XHJcbiAgICAsIHBvc3RwcmludCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnLS1wb3N0cHJpbnQtLScsIHVuZG9zLnNpemUpXHJcbiAgICAgICAgZm9yKGxldCB1bmRvIG9mIHVuZG9zKSB7XHJcbiAgICAgICAgICB1bmRvKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5kb3MuY2xlYXIoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKVxyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gZGlzcG9zZSAoKSB7XHJcbiAgICB1bmRvVG9wQ1NTKClcclxuICAgIHVuZG9GcmFtZUNTUygpXHJcbiAgICB1bmRvU3R5bGVzKClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdE5vZGVzIChmcmFtZSkge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGZyYW1lLnBhcmVudE5vZGVcclxuICBjb25zdCBkb2MgPSByZXNvbHZlRG9jdW1lbnQoZnJhbWUpXHJcblxyXG4gIGNvbnN0IGFuY2VzdG9ycyA9IFtdXHJcbiAgbGV0IGN1cnJlbnQgPSBjb250YWluZXJcclxuICB3aGlsZShjdXJyZW50LnBhcmVudE5vZGUpIHtcclxuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGVcclxuICAgIGlmKGN1cnJlbnQuc3R5bGUpXHJcbiAgICAgIGFuY2VzdG9ycy5wdXNoKGN1cnJlbnQpXHJcbiAgfVxyXG4gIHJldHVybiB7IGNvbnRhaW5lciwgZG9jLCBhbmNlc3RvcnMgfVxyXG59XHJcblxyXG4vKlxyXG5vdmVyZmxvdzogaGlkZGVuOyBtaW4td2lkdGg6IDk5MHB4OyBoZWlnaHQ6IDM4NXB4OyB3aWR0aDogOTkwcHg7XHJcbm92ZXJmbG93OiBoaWRkZW47IG1pbi13aWR0aDogMzc3cHggIWltcG9ydGFudDsgaGVpZ2h0OiAzODVweDsgd2lkdGg6IDk5MHB4OyBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDsgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7IG1pbi1oZWlnaHQ6IDI4NnB4ICFpbXBvcnRhbnQ7XHJcbm92ZXJmbG93OiBoaWRkZW47IG1pbi13aWR0aDogOTkwcHggIWltcG9ydGFudDsgaGVpZ2h0OiAzODVweDsgd2lkdGg6IDk5MHB4O1xyXG4qL1xyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZURvY3VtZW50KG9iaikge1xyXG4gIGlmKG9iai5jb250ZW50RG9jdW1lbnQpXHJcbiAgICByZXR1cm4gb2JqLmNvbnRlbnREb2N1bWVudFxyXG4gIGVsc2UgaWYob2JqLmNvbnRlbnRXaW5kb3cpXHJcbiAgICByZXR1cm4gb2JqLmNvbnRlbnRXaW5kb3cuY29udGVudERvY3VtZW50XHJcbiAgZWxzZSBpZihvYmouZG9jdW1lbnQpXHJcbiAgICByZXR1cm4gb2JqLmRvY3VtZW50XHJcbiAgdGhyb3cgbmV3IEVycm9yKCdyZXNvbHZlRG9jdW1lbnQgZm91bmQgbm8gZG9jdW1lbnQgb2JqZWN0JylcclxufVxyXG5cclxuY29uc3Qgc3R5bGVzSUQgPSAndXNlLXByaW50LWZyYW1lLXN0eWxlcydcclxuZnVuY3Rpb24gc2V0UHJpbnRDU1MoZG9jLCBjc3MpIHtcclxuICBpZihkb2MuZ2V0RWxlbWVudEJ5SWQoc3R5bGVzSUQpKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRQcmludENTUyBzaG91bGQgbm90IGJlIHJlZ2lzdGVyZWQgdHdpY2Ugb24gdGhlIHNhbWUgZG9jdW1lbnQgLSBjYWxsIHVuZG9QcmludENTUyBmaXJzdC4nKVxyXG4gIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpXHJcbiAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZXNJRClcclxuICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJylcclxuICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsICdwcmludCcpXHJcbiAgc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGNzc1xyXG4gIGRvYy5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcclxuICByZXR1cm4gZnVuY3Rpb24gdW5kb1ByaW50Q1NTICgpIHtcclxuICAgIGRvYy5oZWFkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzZXRTdHlsZXMgKGVsZW1lbnQsIHN0eWxlcykge1xyXG4gIGNvbnN0IHByZXZTdHlsZXMgPSBPYmplY3QuZW50cmllcyhzdHlsZXMpLnJlZHVjZSgocHJldiwgWyBrZXksIG5leHQgXSkgPT4ge1xyXG4gICAgY29uc3QgcHJvcCA9IHsgdmFsdWU6IGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShrZXkpLCBwcmlvcml0eTogZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KGtleSkgfVxyXG4gICAgY29uc29sZS5pbmZvKCdTRVQgU1RZTEVTJywga2V5LCBuZXh0LCBwcm9wKVxyXG4gICAgY29uc3Qgc2VyaWFsaXplZCA9IHByb3AudmFsdWUgPyBzZXJpYWxpemVDU1NQcm9wZXJ0eShwcm9wKSA6IG51bGxcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcmV2LCBrZXksIHsgdmFsdWU6IHNlcmlhbGl6ZWQsIGVudW1lcmFibGU6IHRydWUgfSlcclxuICAgIGlmKG5leHQpIHtcclxuICAgICAgY29uc3QgeyB2YWx1ZSwgcHJpb3JpdHkgfSA9IHBhcnNlQ1NTUHJvcGVydHkobmV4dClcclxuICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBwcmlvcml0eSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoa2V5KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXZcclxuICB9LCB7fSlcclxuICByZXR1cm4gZnVuY3Rpb24gdW5kb1N0eWxlcyAoKSB7XHJcbiAgICBzZXRTdHlsZXMgKGVsZW1lbnQsIHByZXZTdHlsZXMpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMCIsImlzT2JqZWN0IiwiZG9jdW1lbnQiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsImRQIiwiZ2xvYmFsIiwiaGlkZSIsIiRleHBvcnQiLCJ0b1N0cmluZyIsImRlZmluZWQiLCJ0b0ludGVnZXIiLCJtaW4iLCJ0b0lPYmplY3QiLCJoYXMiLCJJRV9QUk9UTyIsImVudW1CdWdLZXlzIiwiYW5PYmplY3QiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNCIsIlBST1RPVFlQRSIsImNyZWF0ZSIsInNldFRvU3RyaW5nVGFnIiwicmVxdWlyZSQkOSIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ3IiwicmVxdWlyZSQkNiIsIkl0ZXJhdG9ycyIsImNvcmUiLCJMSUJSQVJZIiwid2tzRXh0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRLZXlzIiwiY29mIiwiJGtleXMiLCJnT1BOIiwicElFIiwiY3JlYXRlRGVzYyIsInRvUHJpbWl0aXZlIiwiSUU4X0RPTV9ERUZJTkUiLCJnT1BEIiwicmVxdWlyZSQkMjkiLCJyZXF1aXJlJCQyOCIsInJlcXVpcmUkJDI3IiwicmVxdWlyZSQkMjYiLCJyZWRlZmluZSIsInJlcXVpcmUkJDI1IiwicmVxdWlyZSQkMjQiLCJyZXF1aXJlJCQyMyIsInNoYXJlZCIsInJlcXVpcmUkJDIyIiwicmVxdWlyZSQkMjEiLCJ1aWQiLCJyZXF1aXJlJCQyMCIsInJlcXVpcmUkJDE5IiwicmVxdWlyZSQkMTgiLCJyZXF1aXJlJCQxNyIsInJlcXVpcmUkJDE2IiwicmVxdWlyZSQkMTUiLCJpc0FycmF5IiwicmVxdWlyZSQkMTQiLCJyZXF1aXJlJCQxMyIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTEiLCJyZXF1aXJlJCQxMCIsIk9iamVjdFByb3RvIiwiaSIsIm9uUHJpbnQiLCJwcmVwcmludCIsInBvc3RwcmludCIsIndpbmRvdyIsIm9uYmVmb3JlcHJpbnQiLCJ1bmRlZmluZWQiLCJvbmFmdGVycHJpbnQiLCJkaXNwb3NlIiwibXFsTGlzdGVuZXIiLCJtcWwiLCJtYXRjaGVzIiwibWF0Y2hNZWRpYSIsImFkZExpc3RlbmVyIiwiZGlzcG9zZU1lZGlhIiwicmVtb3ZlTGlzdGVuZXIiLCJUQUciLCJJVEVSQVRPUiIsImNsYXNzb2YiLCJpc0VudW0iLCIkZGVmaW5lUHJvcGVydHkiLCJjdHgiLCJ0b09iamVjdCIsInRvTGVuZ3RoIiwiREVTQ1JJUFRPUlMiLCJzdGVwIiwiZmFzdEtleSIsIlNQRUNJRVMiLCJJT2JqZWN0IiwicmVkZWZpbmVBbGwiLCJmb3JPZiIsImFuSW5zdGFuY2UiLCJmcm9tIiwic3RyaXBwZXIiLCJwYXJzZUNTU1Byb3BlcnR5IiwicmF3IiwiRXJyb3IiLCJleGVjIiwibWF0Y2giLCJ2YWx1ZSIsInByaW9yaXR5Iiwic2VyaWFsaXplQ1NTUHJvcGVydHkiLCJwcm9wIiwicm91bmQiLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJzY2FsZVRvV2lkdGgiLCJnZXRTY2FsZSIsIndpZHRoIiwidXNlUHJpbnRGcmFtZSIsImZyYW1lIiwic2VsZWN0SGVpZ2h0RWxlbWVudCIsImRvYyIsInF1ZXJ5U2VsZWN0b3IiLCJib2R5Iiwic2VsZWN0V2lkdGhFbGVtZW50Iiwic2VsZWN0Q29udGFpbmVyU3R5bGUiLCJoZWlnaHRFbGVtZW50Iiwid2lkdGhFbGVtZW50IiwicG9zaXRpb24iLCJ0b3AiLCJib3JkZXIiLCJvdmVyZmxvdyIsInNlbGVjdEZyYW1lU3R5bGUiLCJ2aXNpYmlsaXR5Iiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJtYXJnaW4iLCJzZWxlY3RIZWlnaHRFbGVtZW50U3R5bGUiLCJzZWxlY3RXaWR0aEVsZW1lbnRTdHlsZSIsInNlbGVjdEZyYW1lQm9keVN0eWxlIiwicGFkZGluZyIsInNlbGVjdEFuY2VzdG9yU3R5bGUiLCJkaXNwbGF5IiwidG9wUHJpbnRDU1MiLCJmcmFtZVByaW50Q1NTIiwidW5kb1RvcENTUyIsInNldFByaW50Q1NTIiwidW5kb0ZyYW1lQ1NTIiwicmVzb2x2ZURvY3VtZW50IiwidW5kb3MiLCJkaXNwb3NlUHJpbnQiLCJzZWxlY3ROb2RlcyIsImNvbnRhaW5lciIsImFuY2VzdG9ycyIsInNldEF0dHJpYnV0ZSIsImNvbnRlbnRXaW5kb3ciLCJmb2N1cyIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjb250YWluZXJTdHlsZSIsImZyYW1lU3R5bGUiLCJmcmFtZUJvZHlTdHlsZSIsImhlaWdodEVsZW1lbnRTdHlsZSIsIndpZHRoRWxlbWVudFN0eWxlIiwiYW5jZXN0b3JTdHlsZSIsInNldFN0eWxlcyIsIm1hcCIsImFuY2VzdG9yIiwibG9nIiwic2l6ZSIsInVuZG8iLCJjbGVhciIsInBhcmVudE5vZGUiLCJjdXJyZW50IiwicHVzaCIsIm9iaiIsImNvbnRlbnREb2N1bWVudCIsInN0eWxlc0lEIiwiY3NzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwidW5kb1ByaW50Q1NTIiwiZWxlbWVudCIsInN0eWxlcyIsInByZXZTdHlsZXMiLCJyZWR1Y2UiLCJwcmV2Iiwia2V5IiwibmV4dCIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRQcm9wZXJ0eVByaW9yaXR5IiwiaW5mbyIsInNlcmlhbGl6ZWQiLCJlbnVtZXJhYmxlIiwic2V0UHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsInVuZG9TdHlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtJQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QixjQUFjLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDM0IsT0FBTyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQzFEOztBQ0xEO0FBQ0EsWUFBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLEdBQUcsRUFBRSxJQUFJLFNBQVMsQ0FBQyxNQUFNLFNBQVMsQ0FBQyx3QkFBd0IsR0FBRyxFQUFFLENBQUMsQ0FBQztFQUNsRSxPQUFPLEVBQUUsQ0FBQztDQUNYOztBQ0pELElBQUksU0FBUyxHQUFHQSxVQUF3QjtJQUNwQyxPQUFPLEtBQUtDLFFBQXFCLENBQUM7OztBQUd0QyxhQUFjLEdBQUcsU0FBUyxTQUFTLENBQUM7RUFDbEMsT0FBTyxTQUFTLElBQUksRUFBRSxHQUFHLENBQUM7SUFDeEIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07UUFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxTQUFTLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUNyRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixPQUFPLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU07UUFDOUYsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzQixTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztHQUNqRixDQUFDO0NBQ0g7O0FDaEJELFlBQWMsR0FBRyxJQUFJOzs7O0FDQ3JCLElBQUksTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJO0lBQzdFLE1BQU0sR0FBRyxPQUFPLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0FBQ2hHLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Ozs7QUNIdkMsSUFBSSxJQUFJLEdBQUcsY0FBYyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7OztBQ0RyQyxjQUFjLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDM0IsR0FBRyxPQUFPLEVBQUUsSUFBSSxVQUFVLENBQUMsTUFBTSxTQUFTLENBQUMsRUFBRSxHQUFHLHFCQUFxQixDQUFDLENBQUM7RUFDdkUsT0FBTyxFQUFFLENBQUM7Q0FDWDs7QUNGRCxJQUFJLFNBQVMsR0FBR0EsVUFBd0IsQ0FBQztBQUN6QyxRQUFjLEdBQUcsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztFQUN6QyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDZCxHQUFHLElBQUksS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7RUFDaEMsT0FBTyxNQUFNO0lBQ1gsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLENBQUMsQ0FBQztNQUN4QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3pCLENBQUM7SUFDRixLQUFLLENBQUMsRUFBRSxPQUFPLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUMzQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM1QixDQUFDO0lBQ0YsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQzlCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMvQixDQUFDO0dBQ0g7RUFDRCxPQUFPLHVCQUF1QjtJQUM1QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQ2xDLENBQUM7Q0FDSDs7QUNuQkQsYUFBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLE9BQU8sT0FBTyxFQUFFLEtBQUssUUFBUSxHQUFHLEVBQUUsS0FBSyxJQUFJLEdBQUcsT0FBTyxFQUFFLEtBQUssVUFBVSxDQUFDO0NBQ3hFOztBQ0ZELElBQUksUUFBUSxHQUFHQSxTQUF1QixDQUFDO0FBQ3ZDLGFBQWMsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sU0FBUyxDQUFDLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO0VBQzVELE9BQU8sRUFBRSxDQUFDO0NBQ1g7O0FDSkQsVUFBYyxHQUFHLFNBQVMsSUFBSSxDQUFDO0VBQzdCLElBQUk7SUFDRixPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNqQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ1IsT0FBTyxJQUFJLENBQUM7R0FDYjtDQUNGOztBQ0xELGdCQUFjLEdBQUcsQ0FBQ0EsTUFBbUIsQ0FBQyxVQUFVO0VBQzlDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDOUUsQ0FBQzs7QUNIRixJQUFJQyxVQUFRLEdBQUdGLFNBQXVCO0lBQ2xDRyxVQUFRLEdBQUdGLE9BQW9CLENBQUMsUUFBUTtJQUV4QyxFQUFFLEdBQUdDLFVBQVEsQ0FBQ0MsVUFBUSxDQUFDLElBQUlELFVBQVEsQ0FBQ0MsVUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hFLGNBQWMsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMzQixPQUFPLEVBQUUsR0FBR0EsVUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDN0M7O0FDTkQsaUJBQWMsR0FBRyxDQUFDQyxZQUF5QixJQUFJLENBQUNKLE1BQW1CLENBQUMsVUFBVTtFQUM1RSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUNDLFVBQXdCLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDM0csQ0FBQzs7QUNERixJQUFJQyxVQUFRLEdBQUdELFNBQXVCLENBQUM7OztBQUd2QyxnQkFBYyxHQUFHLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUM5QixHQUFHLENBQUNDLFVBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztFQUMzQixJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUM7RUFDWixHQUFHLENBQUMsSUFBSSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxJQUFJLENBQUNBLFVBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDO0VBQzNGLEdBQUcsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDQSxVQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQztFQUNyRixHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQ0EsVUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUM7RUFDNUYsTUFBTSxTQUFTLENBQUMseUNBQXlDLENBQUMsQ0FBQztDQUM1RDs7QUNYRCxJQUFJLFFBQVEsU0FBU0csU0FBdUI7SUFDeEMsY0FBYyxHQUFHRCxhQUE0QjtJQUM3QyxXQUFXLE1BQU1KLFlBQTBCO0lBQzNDTSxJQUFFLGVBQWUsTUFBTSxDQUFDLGNBQWMsQ0FBQzs7QUFFM0MsUUFBWUwsWUFBeUIsR0FBRyxNQUFNLENBQUMsY0FBYyxHQUFHLFNBQVMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDO0VBQ3ZHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNaLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3pCLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNyQixHQUFHLGNBQWMsQ0FBQyxJQUFJO0lBQ3BCLE9BQU9LLElBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0dBQzdCLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZTtFQUN6QixHQUFHLEtBQUssSUFBSSxVQUFVLElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxNQUFNLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0VBQzFGLEdBQUcsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztFQUNqRCxPQUFPLENBQUMsQ0FBQztDQUNWOzs7Ozs7QUNmRCxpQkFBYyxHQUFHLFNBQVMsTUFBTSxFQUFFLEtBQUssQ0FBQztFQUN0QyxPQUFPO0lBQ0wsVUFBVSxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixZQUFZLEVBQUUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLFFBQVEsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0IsS0FBSyxTQUFTLEtBQUs7R0FDcEIsQ0FBQztDQUNIOztBQ1BELElBQUksRUFBRSxXQUFXRixTQUF1QjtJQUNwQyxVQUFVLEdBQUdKLGFBQTJCLENBQUM7QUFDN0MsU0FBYyxHQUFHQyxZQUF5QixHQUFHLFNBQVMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7RUFDdkUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2hELEdBQUcsU0FBUyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQztFQUM5QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0VBQ3BCLE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FDUEQsSUFBSU0sUUFBTSxNQUFNRixPQUFvQjtJQUNoQyxJQUFJLFFBQVFELEtBQWtCO0lBQzlCLEdBQUcsU0FBU0osSUFBaUI7SUFDN0JRLE1BQUksUUFBUVAsS0FBa0I7SUFDOUIsU0FBUyxHQUFHLFdBQVcsQ0FBQzs7QUFFNUIsSUFBSVEsU0FBTyxHQUFHLFNBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7RUFDeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixTQUFTLEdBQUcsSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixTQUFTLEdBQUcsSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixRQUFRLElBQUksSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixPQUFPLEtBQUssSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixPQUFPLEtBQUssSUFBSSxHQUFHQSxTQUFPLENBQUMsQ0FBQztNQUM1QixPQUFPLEtBQUssU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUM5RCxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQztNQUM5QixNQUFNLE1BQU0sU0FBUyxHQUFHRixRQUFNLEdBQUcsU0FBUyxHQUFHQSxRQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQ0EsUUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUM7TUFDM0YsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDbEIsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztFQUMzQixJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUM7O0lBRWhCLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUN4RCxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVM7O0lBRWxDLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7TUFFeEUsT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFQSxRQUFNLENBQUM7O01BRWpDLE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7TUFDNUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixHQUFHLElBQUksWUFBWSxDQUFDLENBQUM7VUFDbkIsT0FBTyxTQUFTLENBQUMsTUFBTTtZQUNyQixLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7V0FDNUIsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO09BQ25DLENBQUM7TUFDRixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQzVCLE9BQU8sQ0FBQyxDQUFDOztLQUVWLEVBQUUsR0FBRyxDQUFDLEdBQUcsUUFBUSxJQUFJLE9BQU8sR0FBRyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7O0lBRS9FLEdBQUcsUUFBUSxDQUFDO01BQ1YsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDOztNQUV2RCxHQUFHLElBQUksR0FBR0UsU0FBTyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUNELE1BQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzVFO0dBQ0Y7Q0FDRixDQUFDOztBQUVGQyxTQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkQSxTQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkQSxTQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkQSxTQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkQSxTQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNmQSxTQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNmQSxTQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNmQSxTQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNoQixXQUFjLEdBQUdBLFNBQU87O0FDNUR4QixhQUFjLEdBQUdSLEtBQWtCOztBQ0FuQyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0FBQ3ZDLFFBQWMsR0FBRyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7RUFDaEMsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNyQzs7QUNIRCxjQUFjLEdBQUcsRUFBRTs7QUNBbkIsSUFBSVMsVUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBRTNCLFFBQWMsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMzQixPQUFPQSxVQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2Qzs7QUNIRCxJQUFJLEdBQUcsR0FBR1QsSUFBaUIsQ0FBQztBQUM1QixZQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMxRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDeEQ7O0FDSEQsSUFBSSxPQUFPLEdBQUdELFFBQXFCO0lBQy9CVyxTQUFPLEdBQUdWLFFBQXFCLENBQUM7QUFDcEMsY0FBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLE9BQU8sT0FBTyxDQUFDVSxTQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3Qjs7QUNKRCxJQUFJQyxXQUFTLEdBQUdYLFVBQXdCO0lBQ3BDLEdBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3pCLGFBQWMsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMzQixPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDVyxXQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDMUQ7O0FDTEQsSUFBSUEsV0FBUyxHQUFHWCxVQUF3QjtJQUNwQyxHQUFHLFNBQVMsSUFBSSxDQUFDLEdBQUc7SUFDcEJZLEtBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3pCLFlBQWMsR0FBRyxTQUFTLEtBQUssRUFBRSxNQUFNLENBQUM7RUFDdEMsS0FBSyxHQUFHRCxXQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDekIsT0FBTyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHQyxLQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ2hFOztBQ0pELElBQUlDLFdBQVMsR0FBR1YsVUFBd0I7SUFDcEMsUUFBUSxJQUFJSixTQUF1QjtJQUNuQyxPQUFPLEtBQUtDLFFBQXNCLENBQUM7QUFDdkMsa0JBQWMsR0FBRyxTQUFTLFdBQVcsQ0FBQztFQUNwQyxPQUFPLFNBQVMsS0FBSyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUM7SUFDbkMsSUFBSSxDQUFDLFFBQVFhLFdBQVMsQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNCLEtBQUssSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQztRQUNuQyxLQUFLLENBQUM7O0lBRVYsR0FBRyxXQUFXLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUM7TUFDOUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO01BQ25CLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQzs7S0FFL0IsTUFBTSxLQUFLLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxXQUFXLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztNQUMvRCxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxXQUFXLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztLQUNyRCxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUM7R0FDN0IsQ0FBQztDQUNIOztBQ3BCRCxJQUFJUCxRQUFNLEdBQUdOLE9BQW9CO0lBQzdCLE1BQU0sR0FBRyxvQkFBb0I7SUFDN0IsS0FBSyxJQUFJTSxRQUFNLENBQUMsTUFBTSxDQUFDLEtBQUtBLFFBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNyRCxXQUFjLEdBQUcsU0FBUyxHQUFHLENBQUM7RUFDNUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0NBQ3hDOztBQ0xELElBQUksRUFBRSxHQUFHLENBQUM7SUFDTixFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCLFFBQWMsR0FBRyxTQUFTLEdBQUcsQ0FBQztFQUM1QixPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsR0FBRyxFQUFFLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2Rjs7QUNKRCxJQUFJLE1BQU0sR0FBR1AsT0FBb0IsQ0FBQyxNQUFNLENBQUM7SUFDckMsR0FBRyxNQUFNQyxJQUFpQixDQUFDO0FBQy9CLGNBQWMsR0FBRyxTQUFTLEdBQUcsQ0FBQztFQUM1QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDaEQ7O0FDSkQsSUFBSWMsS0FBRyxZQUFZVixJQUFpQjtJQUNoQyxTQUFTLE1BQU1ELFVBQXdCO0lBQ3ZDLFlBQVksR0FBR0osY0FBNEIsQ0FBQyxLQUFLLENBQUM7SUFDbERnQixVQUFRLE9BQU9mLFVBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXhELHVCQUFjLEdBQUcsU0FBUyxNQUFNLEVBQUUsS0FBSyxDQUFDO0VBQ3RDLElBQUksQ0FBQyxRQUFRLFNBQVMsQ0FBQyxNQUFNLENBQUM7TUFDMUIsQ0FBQyxRQUFRLENBQUM7TUFDVixNQUFNLEdBQUcsRUFBRTtNQUNYLEdBQUcsQ0FBQztFQUNSLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSWUsVUFBUSxDQUFDRCxLQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0VBRWhFLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBR0EsS0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNoRDtFQUNELE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FDaEJEO0FBQ0EsZ0JBQWMsR0FBRztFQUNmLCtGQUErRjtFQUMvRixLQUFLLENBQUMsR0FBRyxDQUFDOztBQ0ZaLElBQUksS0FBSyxTQUFTZixtQkFBa0M7SUFDaERpQixhQUFXLEdBQUdoQixZQUEyQixDQUFDOztBQUU5QyxlQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFZ0IsYUFBVyxDQUFDLENBQUM7Q0FDOUI7O0FDTkQsSUFBSVgsSUFBRSxTQUFTRCxTQUF1QjtJQUNsQ2EsVUFBUSxHQUFHZCxTQUF1QjtJQUNsQyxPQUFPLElBQUlKLFdBQXlCLENBQUM7O0FBRXpDLGNBQWMsR0FBR0MsWUFBeUIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDO0VBQzdHaUIsVUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ1osSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQztNQUM1QixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07TUFDcEIsQ0FBQyxHQUFHLENBQUM7TUFDTCxDQUFDLENBQUM7RUFDTixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUNaLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2RCxPQUFPLENBQUMsQ0FBQztDQUNWOztBQ1pELFNBQWMsR0FBR0wsT0FBb0IsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLGVBQWU7O0FDQzFFLElBQUlpQixVQUFRLE1BQU1DLFNBQXVCO0lBQ3JDLEdBQUcsV0FBV0MsVUFBd0I7SUFDdEMsV0FBVyxHQUFHZixZQUEyQjtJQUN6QyxRQUFRLE1BQU1ELFVBQXdCLENBQUMsVUFBVSxDQUFDO0lBQ2xELEtBQUssU0FBUyxVQUFVLGVBQWU7SUFDdkNpQixXQUFTLEtBQUssV0FBVyxDQUFDOzs7QUFHOUIsSUFBSSxVQUFVLEdBQUcsVUFBVTs7RUFFekIsSUFBSSxNQUFNLEdBQUdyQixVQUF3QixDQUFDLFFBQVEsQ0FBQztNQUMzQyxDQUFDLFFBQVEsV0FBVyxDQUFDLE1BQU07TUFDM0IsRUFBRSxPQUFPLEdBQUc7TUFDWixFQUFFLE9BQU8sR0FBRztNQUNaLGNBQWMsQ0FBQztFQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7RUFDOUJDLEtBQWtCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDOzs7RUFHM0IsY0FBYyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQy9DLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUN0QixjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxRQUFRLEdBQUcsRUFBRSxHQUFHLG1CQUFtQixHQUFHLEVBQUUsR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDckYsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0VBQ3ZCLFVBQVUsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO0VBQzlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxVQUFVLENBQUNvQixXQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2RCxPQUFPLFVBQVUsRUFBRSxDQUFDO0NBQ3JCLENBQUM7O0FBRUYsaUJBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7RUFDOUQsSUFBSSxNQUFNLENBQUM7RUFDWCxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDWixLQUFLLENBQUNBLFdBQVMsQ0FBQyxHQUFHSCxVQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDO0lBQ25CLEtBQUssQ0FBQ0csV0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDOztJQUV4QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3RCLE1BQU0sTUFBTSxHQUFHLFVBQVUsRUFBRSxDQUFDO0VBQzdCLE9BQU8sVUFBVSxLQUFLLFNBQVMsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNwRSxDQUFDOzs7QUN4Q0YsSUFBSSxLQUFLLFFBQVFqQixPQUFvQixDQUFDLEtBQUssQ0FBQztJQUN4QyxHQUFHLFVBQVVKLElBQWlCO0lBQzlCLE1BQU0sT0FBT0MsT0FBb0IsQ0FBQyxNQUFNO0lBQ3hDLFVBQVUsR0FBRyxPQUFPLE1BQU0sSUFBSSxVQUFVLENBQUM7O0FBRTdDLElBQUksUUFBUSxHQUFHLGNBQWMsR0FBRyxTQUFTLElBQUksQ0FBQztFQUM1QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2hDLFVBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEdBQUcsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUNoRixDQUFDOztBQUVGLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSzs7O0FDVnRCLElBQUksR0FBRyxHQUFHRyxTQUF1QixDQUFDLENBQUM7SUFDL0JXLEtBQUcsR0FBR2YsSUFBaUI7SUFDdkIsR0FBRyxHQUFHQyxJQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUUzQyxtQkFBYyxHQUFHLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDdEMsR0FBRyxFQUFFLElBQUksQ0FBQ2MsS0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ2xHOztBQ0xELElBQUlPLFFBQU0sV0FBV0YsYUFBMkI7SUFDNUMsVUFBVSxPQUFPZixhQUEyQjtJQUM1Q2tCLGdCQUFjLEdBQUduQixlQUErQjtJQUNoRCxpQkFBaUIsR0FBRyxFQUFFLENBQUM7OztBQUczQkosS0FBa0IsQ0FBQyxpQkFBaUIsRUFBRUMsSUFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRWpHLGVBQWMsR0FBRyxTQUFTLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0VBQ2hELFdBQVcsQ0FBQyxTQUFTLEdBQUdxQixRQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0VDLGdCQUFjLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztDQUNqRDs7QUNYRCxJQUFJWixTQUFPLEdBQUdWLFFBQXFCLENBQUM7QUFDcEMsYUFBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLE9BQU8sTUFBTSxDQUFDVSxTQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM1Qjs7QUNIRCxJQUFJSSxLQUFHLFdBQVdYLElBQWlCO0lBQy9CLFFBQVEsTUFBTUosU0FBdUI7SUFDckNnQixVQUFRLE1BQU1mLFVBQXdCLENBQUMsVUFBVSxDQUFDO0lBQ2xELFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDOztBQUVuQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUMsQ0FBQztFQUNuRCxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hCLEdBQUdjLEtBQUcsQ0FBQyxDQUFDLEVBQUVDLFVBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDQSxVQUFRLENBQUMsQ0FBQztFQUN2QyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFdBQVcsSUFBSSxVQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDbEUsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztHQUNoQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLE1BQU0sR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO0NBQ25EOztBQ1hELElBQUksT0FBTyxVQUFVUSxRQUFxQjtJQUN0QyxPQUFPLFVBQVVDLE9BQW9CO0lBQ3JDLFFBQVEsU0FBU0MsU0FBc0I7SUFDdkMsSUFBSSxhQUFhQyxLQUFrQjtJQUNuQ1osS0FBRyxjQUFjSSxJQUFpQjtJQUNsQyxTQUFTLFFBQVFDLFVBQXVCO0lBQ3hDLFdBQVcsTUFBTWYsV0FBeUI7SUFDMUMsY0FBYyxHQUFHRCxlQUErQjtJQUNoRCxjQUFjLEdBQUdKLFVBQXdCO0lBQ3pDLFFBQVEsU0FBU0MsSUFBaUIsQ0FBQyxVQUFVLENBQUM7SUFDOUMsS0FBSyxZQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xELFdBQVcsTUFBTSxZQUFZO0lBQzdCLElBQUksYUFBYSxNQUFNO0lBQ3ZCLE1BQU0sV0FBVyxRQUFRLENBQUM7O0FBRTlCLElBQUksVUFBVSxHQUFHLFVBQVUsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7O0FBRTVDLGVBQWMsR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztFQUMvRSxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNyQyxJQUFJLFNBQVMsR0FBRyxTQUFTLElBQUksQ0FBQztJQUM1QixHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsT0FBTyxJQUFJO01BQ1QsS0FBSyxJQUFJLEVBQUUsT0FBTyxTQUFTLElBQUksRUFBRSxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztNQUN6RSxLQUFLLE1BQU0sRUFBRSxPQUFPLFNBQVMsTUFBTSxFQUFFLEVBQUUsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzlFLENBQUMsT0FBTyxTQUFTLE9BQU8sRUFBRSxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztHQUNwRSxDQUFDO0VBQ0YsSUFBSSxHQUFHLFVBQVUsSUFBSSxHQUFHLFdBQVc7TUFDL0IsVUFBVSxHQUFHLE9BQU8sSUFBSSxNQUFNO01BQzlCLFVBQVUsR0FBRyxLQUFLO01BQ2xCLEtBQUssUUFBUSxJQUFJLENBQUMsU0FBUztNQUMzQixPQUFPLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztNQUMvRSxRQUFRLEtBQUssT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUM7TUFDMUMsUUFBUSxLQUFLLE9BQU8sR0FBRyxDQUFDLFVBQVUsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVM7TUFDaEYsVUFBVSxHQUFHLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLEdBQUcsT0FBTztNQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDOztFQUVwQyxHQUFHLFVBQVUsQ0FBQztJQUNaLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RCxHQUFHLGlCQUFpQixLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUM7O01BRXhDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O01BRTdDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQ2MsS0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDaEc7R0FDRjs7RUFFRCxHQUFHLFVBQVUsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7SUFDbEQsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNsQixRQUFRLEdBQUcsU0FBUyxNQUFNLEVBQUUsRUFBRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO0dBQzVEOztFQUVELEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxNQUFNLE1BQU0sS0FBSyxJQUFJLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQ2pDOztFQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7RUFDM0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQztFQUM3QixHQUFHLE9BQU8sQ0FBQztJQUNULE9BQU8sR0FBRztNQUNSLE1BQU0sR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7TUFDbEQsSUFBSSxLQUFLLE1BQU0sT0FBTyxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztNQUNoRCxPQUFPLEVBQUUsUUFBUTtLQUNsQixDQUFDO0lBQ0YsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDO01BQzNCLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdkQsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDOUU7RUFDRCxPQUFPLE9BQU8sQ0FBQztDQUNoQjs7QUNwRUQsSUFBSSxHQUFHLElBQUlmLFNBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUd6Q0MsV0FBeUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDO0VBQzVELElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQzNCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztDQUViLEVBQUUsVUFBVTtFQUNYLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO01BQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFO01BQ2YsS0FBSyxDQUFDO0VBQ1YsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDM0QsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDdEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO0VBQ3hCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNwQyxDQUFDOztBQ2hCRixxQkFBYyxHQUFHLFVBQVUsZUFBZTs7QUNBMUMsYUFBYyxHQUFHLFNBQVMsSUFBSSxFQUFFLEtBQUssQ0FBQztFQUNwQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3JDOztBQ0RELElBQUksZ0JBQWdCLEdBQUdtQixpQkFBZ0M7SUFDbkQsSUFBSSxlQUFlZixTQUF1QjtJQUMxQ3VCLFdBQVMsVUFBVXhCLFVBQXVCO0lBQzFDVSxXQUFTLFVBQVVkLFVBQXdCLENBQUM7Ozs7OztBQU1oRCxzQkFBYyxHQUFHQyxXQUF5QixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxRQUFRLEVBQUUsSUFBSSxDQUFDO0VBQ2pGLElBQUksQ0FBQyxFQUFFLEdBQUdhLFdBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDOztDQUVoQixFQUFFLFVBQVU7RUFDWCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFBRTtNQUNmLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtNQUNmLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztJQUNwQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNoQjtFQUNELEdBQUcsSUFBSSxJQUFJLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDMUMsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUM3QyxPQUFPLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7QUFHYmMsV0FBUyxDQUFDLFNBQVMsR0FBR0EsV0FBUyxDQUFDLEtBQUssQ0FBQzs7QUFFdEMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDM0IsZ0JBQWdCLENBQUMsU0FBUyxDQUFDOztBQ2hDM0IsSUFBSXJCLFFBQU0sVUFBVUYsT0FBb0I7SUFDcENHLE1BQUksWUFBWUosS0FBa0I7SUFDbEN3QixXQUFTLE9BQU81QixVQUF1QjtJQUN2QyxhQUFhLEdBQUdDLElBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRXJELElBQUksSUFBSSxXQUFXLEdBQUcsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDbEgsSUFBSSxJQUFJLFNBQVMsV0FBVyxDQUFDLENBQUMsQ0FBQztNQUMzQixVQUFVLEdBQUdNLFFBQU0sQ0FBQyxJQUFJLENBQUM7TUFDekIsS0FBSyxRQUFRLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDO0VBQ3BELEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDQyxNQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNuRW9CLFdBQVMsQ0FBQyxJQUFJLENBQUMsR0FBR0EsV0FBUyxDQUFDLEtBQUssQ0FBQzs7O0FDWHBDLFVBQVkzQixJQUFpQjs7Ozs7O0FDRTdCLGNBQWMsR0FBR0EsT0FBaUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOzs7QUNGaEUsY0FBYyxHQUFHLEVBQUUsU0FBUyxFQUFFQSxVQUE2QyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Ozs7QUNBL0YsSUFBSSxJQUFJLE9BQU9tQixJQUFpQixDQUFDLE1BQU0sQ0FBQztJQUNwQyxRQUFRLEdBQUdmLFNBQXVCO0lBQ2xDLEdBQUcsUUFBUUQsSUFBaUI7SUFDNUIsT0FBTyxJQUFJSixTQUF1QixDQUFDLENBQUM7SUFDcEMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNqQixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxJQUFJLFVBQVU7RUFDbEQsT0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDO0FBQ0YsSUFBSSxNQUFNLEdBQUcsQ0FBQ0MsTUFBbUIsQ0FBQyxVQUFVO0VBQzFDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ25ELENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQ3hCLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQ3hCLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFO0lBQ2IsQ0FBQyxFQUFFLEVBQUU7R0FDTixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUM7QUFDRixJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUM7O0VBRWhDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEVBQUUsSUFBSSxRQUFRLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQzlGLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDOztJQUVoQixHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDOztJQUVoQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDOztJQUV0QixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7O0dBRWIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDckIsQ0FBQztBQUNGLElBQUksT0FBTyxHQUFHLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQztFQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUFFaEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQzs7SUFFakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssQ0FBQzs7SUFFeEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztHQUViLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3JCLENBQUM7O0FBRUYsSUFBSSxRQUFRLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDekIsR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN6RSxPQUFPLEVBQUUsQ0FBQztDQUNYLENBQUM7QUFDRixJQUFJLElBQUksR0FBRyxjQUFjLEdBQUc7RUFDMUIsR0FBRyxPQUFPLElBQUk7RUFDZCxJQUFJLE1BQU0sS0FBSztFQUNmLE9BQU8sR0FBRyxPQUFPO0VBQ2pCLE9BQU8sR0FBRyxPQUFPO0VBQ2pCLFFBQVEsRUFBRSxRQUFRO0NBQ25COzs7QUNwREQsSUFBSU0sUUFBTSxXQUFXYSxPQUFvQjtJQUNyQ1MsTUFBSSxhQUFheEIsS0FBa0I7SUFDbkN5QixTQUFPLFVBQVUxQixRQUFxQjtJQUN0QzJCLFFBQU0sV0FBVy9CLE9BQXFCO0lBQ3RDZ0MsZ0JBQWMsR0FBRy9CLFNBQXVCLENBQUMsQ0FBQyxDQUFDO0FBQy9DLGNBQWMsR0FBRyxTQUFTLElBQUksQ0FBQztFQUM3QixJQUFJLE9BQU8sR0FBRzRCLE1BQUksQ0FBQyxNQUFNLEtBQUtBLE1BQUksQ0FBQyxNQUFNLEdBQUdDLFNBQU8sR0FBRyxFQUFFLEdBQUd2QixRQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0VBQ2hGLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLElBQUksT0FBTyxDQUFDLENBQUN5QixnQkFBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUVELFFBQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZHOztBQ1JELElBQUlFLFNBQU8sS0FBS2pDLFdBQXlCO0lBQ3JDYyxXQUFTLEdBQUdiLFVBQXdCLENBQUM7QUFDekMsVUFBYyxHQUFHLFNBQVMsTUFBTSxFQUFFLEVBQUUsQ0FBQztFQUNuQyxJQUFJLENBQUMsUUFBUWEsV0FBUyxDQUFDLE1BQU0sQ0FBQztNQUMxQixJQUFJLEtBQUttQixTQUFPLENBQUMsQ0FBQyxDQUFDO01BQ25CLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtNQUNwQixLQUFLLElBQUksQ0FBQztNQUNWLEdBQUcsQ0FBQztFQUNSLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUM7Q0FDbEU7O0FDVEQsVUFBWSxNQUFNLENBQUMscUJBQXFCOzs7Ozs7QUNBeEMsVUFBWSxFQUFFLENBQUMsb0JBQW9COzs7Ozs7QUNDbkMsSUFBSUEsU0FBTyxHQUFHN0IsV0FBeUI7SUFDbkMsSUFBSSxNQUFNSixXQUF5QjtJQUNuQyxHQUFHLE9BQU9DLFVBQXdCLENBQUM7QUFDdkMsYUFBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNCLElBQUksTUFBTSxPQUFPZ0MsU0FBTyxDQUFDLEVBQUUsQ0FBQztNQUN4QixVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUN4QixHQUFHLFVBQVUsQ0FBQztJQUNaLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDeEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxTQUFTLENBQUM7UUFDWCxHQUFHLENBQUM7SUFDUixNQUFNLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNsRixDQUFDLE9BQU8sTUFBTSxDQUFDO0NBQ2pCOztBQ2JELElBQUlDLEtBQUcsR0FBR2pDLElBQWlCLENBQUM7QUFDNUIsWUFBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxPQUFPLENBQUMsR0FBRyxDQUFDO0VBQ3JELE9BQU9pQyxLQUFHLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDO0NBQzVCOztBQ0hELElBQUlDLE9BQUssUUFBUW5DLG1CQUFrQztJQUMvQyxVQUFVLEdBQUdDLFlBQTJCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFM0UsVUFBWSxNQUFNLENBQUMsbUJBQW1CLElBQUksU0FBUyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7RUFDdkUsT0FBT2tDLE9BQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDN0I7Ozs7OztBQ0xELElBQUlyQixXQUFTLEdBQUdkLFVBQXdCO0lBQ3BDb0MsTUFBSSxRQUFRbkMsV0FBeUIsQ0FBQyxDQUFDO0lBQ3ZDUyxVQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQzs7QUFFNUIsSUFBSSxXQUFXLEdBQUcsT0FBTyxNQUFNLElBQUksUUFBUSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsbUJBQW1CO0lBQy9FLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTVDLElBQUksY0FBYyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQy9CLElBQUk7SUFDRixPQUFPMEIsTUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ2pCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDUixPQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUM1QjtDQUNGLENBQUM7O0FBRUYsVUFBbUIsU0FBUyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7RUFDakQsT0FBTyxXQUFXLElBQUkxQixVQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxFQUFFLENBQUMsR0FBRzBCLE1BQUksQ0FBQ3RCLFdBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3pHLENBQUM7Ozs7OztBQ2xCRixJQUFJdUIsS0FBRyxjQUFjVixVQUF3QjtJQUN6Q1csWUFBVSxPQUFPbkIsYUFBMkI7SUFDNUNMLFdBQVMsUUFBUU0sVUFBd0I7SUFDekNtQixhQUFXLE1BQU1sQyxZQUEwQjtJQUMzQ1UsS0FBRyxjQUFjWCxJQUFpQjtJQUNsQ29DLGdCQUFjLEdBQUd4QyxhQUE0QjtJQUM3Q3lDLE1BQUksYUFBYSxNQUFNLENBQUMsd0JBQXdCLENBQUM7O0FBRXJELFVBQVl4QyxZQUF5QixHQUFHd0MsTUFBSSxHQUFHLFNBQVMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNwRixDQUFDLEdBQUczQixXQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsQ0FBQyxHQUFHeUIsYUFBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUN6QixHQUFHQyxnQkFBYyxDQUFDLElBQUk7SUFDcEIsT0FBT0MsTUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUNuQixDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWU7RUFDekIsR0FBRzFCLEtBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBT3VCLFlBQVUsQ0FBQyxDQUFDRCxLQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekQ7Ozs7OztBQ2JELElBQUk5QixRQUFNLFdBQVdtQyxPQUFvQjtJQUNyQzNCLEtBQUcsY0FBYzRCLElBQWlCO0lBQ2xDLFdBQVcsTUFBTUMsWUFBeUI7SUFDMUNuQyxTQUFPLFVBQVVvQyxPQUFvQjtJQUNyQ0MsVUFBUSxTQUFTQyxTQUFzQjtJQUN2QyxJQUFJLGFBQWFDLEtBQWtCLENBQUMsR0FBRztJQUN2QyxNQUFNLFdBQVdDLE1BQW1CO0lBQ3BDQyxRQUFNLFdBQVdDLE9BQW9CO0lBQ3JDNUIsZ0JBQWMsR0FBRzZCLGVBQStCO0lBQ2hEQyxLQUFHLGNBQWNDLElBQWlCO0lBQ2xDLEdBQUcsY0FBY0MsSUFBaUI7SUFDbEMsTUFBTSxXQUFXQyxPQUFxQjtJQUN0QyxTQUFTLFFBQVFDLFVBQXdCO0lBQ3pDLEtBQUssWUFBWUMsTUFBbUI7SUFDcEMsUUFBUSxTQUFTQyxTQUF1QjtJQUN4Q0MsU0FBTyxVQUFVQyxRQUFzQjtJQUN2QzNDLFVBQVEsU0FBUzRDLFNBQXVCO0lBQ3hDaEQsV0FBUyxRQUFRaUQsVUFBd0I7SUFDekN4QixhQUFXLE1BQU15QixZQUEwQjtJQUMzQzFCLFlBQVUsT0FBTzJCLGFBQTJCO0lBQzVDLE9BQU8sVUFBVXpDLGFBQTJCO0lBQzVDLE9BQU8sVUFBVUMsY0FBNkI7SUFDOUMsS0FBSyxZQUFZQyxXQUF5QjtJQUMxQyxHQUFHLGNBQWNDLFNBQXVCO0lBQ3hDUSxPQUFLLFlBQVloQixXQUF5QjtJQUMxQyxJQUFJLGFBQWEsS0FBSyxDQUFDLENBQUM7SUFDeEJiLElBQUUsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLGFBQWEsT0FBTyxDQUFDLENBQUM7SUFDMUIsT0FBTyxVQUFVQyxRQUFNLENBQUMsTUFBTTtJQUM5QixLQUFLLFlBQVlBLFFBQU0sQ0FBQyxJQUFJO0lBQzVCLFVBQVUsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVM7SUFDekNjLFdBQVMsUUFBUSxXQUFXO0lBQzVCLE1BQU0sV0FBVyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQy9CLFlBQVksS0FBSyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ25DLE1BQU0sV0FBVyxFQUFFLENBQUMsb0JBQW9CO0lBQ3hDLGNBQWMsR0FBRzZCLFFBQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMxQyxVQUFVLE9BQU9BLFFBQU0sQ0FBQyxTQUFTLENBQUM7SUFDbEMsU0FBUyxRQUFRQSxRQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3JDZ0IsYUFBVyxNQUFNLE1BQU0sQ0FBQzdDLFdBQVMsQ0FBQztJQUNsQyxVQUFVLE9BQU8sT0FBTyxPQUFPLElBQUksVUFBVTtJQUM3QyxPQUFPLFVBQVVkLFFBQU0sQ0FBQyxPQUFPLENBQUM7O0FBRXBDLElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDYyxXQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQ0EsV0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDOzs7QUFHOUUsSUFBSSxhQUFhLEdBQUcsV0FBVyxJQUFJLE1BQU0sQ0FBQyxVQUFVO0VBQ2xELE9BQU8sT0FBTyxDQUFDZixJQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTtJQUN6QixHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU9BLElBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7R0FDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNaLENBQUMsR0FBRyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3ZCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQzRELGFBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUN2QyxHQUFHLFNBQVMsQ0FBQyxPQUFPQSxhQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDckM1RCxJQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNmLEdBQUcsU0FBUyxJQUFJLEVBQUUsS0FBSzRELGFBQVcsQ0FBQzVELElBQUUsQ0FBQzRELGFBQVcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDcEUsR0FBRzVELElBQUUsQ0FBQzs7QUFFUCxJQUFJLElBQUksR0FBRyxTQUFTLEdBQUcsQ0FBQztFQUN0QixJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQ2UsV0FBUyxDQUFDLENBQUMsQ0FBQztFQUN4RCxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztFQUNiLE9BQU8sR0FBRyxDQUFDO0NBQ1osQ0FBQzs7QUFFRixJQUFJLFFBQVEsR0FBRyxVQUFVLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLFFBQVEsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUM3RSxPQUFPLE9BQU8sRUFBRSxJQUFJLFFBQVEsQ0FBQztDQUM5QixHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQ2QsT0FBTyxFQUFFLFlBQVksT0FBTyxDQUFDO0NBQzlCLENBQUM7O0FBRUYsSUFBSSxlQUFlLEdBQUcsU0FBUyxjQUFjLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDdkQsR0FBRyxFQUFFLEtBQUs2QyxhQUFXLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDekRoRCxVQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDYixHQUFHLEdBQUdxQixhQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzdCckIsVUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ1osR0FBR0gsS0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztNQUNmLEdBQUcsQ0FBQ0EsS0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQ1QsSUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUVnQyxZQUFVLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDdEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN4QixNQUFNO01BQ0wsR0FBR3ZCLEtBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7TUFDOUQsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUV1QixZQUFVLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwRCxDQUFDLE9BQU8sYUFBYSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7R0FDcEMsQ0FBQyxPQUFPaEMsSUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDekIsQ0FBQztBQUNGLElBQUksaUJBQWlCLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0VBQ3REWSxVQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDYixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHSixXQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDakMsQ0FBQyxNQUFNLENBQUM7TUFDUixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU07TUFDZixHQUFHLENBQUM7RUFDUixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDekQsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUNsQyxPQUFPLENBQUMsS0FBSyxTQUFTLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMxRSxDQUFDO0FBQ0YsSUFBSSxxQkFBcUIsR0FBRyxTQUFTLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztFQUM1RCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUd5QixhQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDeEQsR0FBRyxJQUFJLEtBQUsyQixhQUFXLElBQUluRCxLQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUNBLEtBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUM7RUFDckYsT0FBTyxDQUFDLElBQUksQ0FBQ0EsS0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDQSxLQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJQSxLQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQzNHLENBQUM7QUFDRixJQUFJLHlCQUF5QixHQUFHLFNBQVMsd0JBQXdCLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQztFQUN4RSxFQUFFLElBQUlELFdBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNwQixHQUFHLEdBQUd5QixhQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzdCLEdBQUcsRUFBRSxLQUFLMkIsYUFBVyxJQUFJbkQsS0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDQSxLQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU87RUFDN0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUN0QixHQUFHLENBQUMsSUFBSUEsS0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFQSxLQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0VBQzFGLE9BQU8sQ0FBQyxDQUFDO0NBQ1YsQ0FBQztBQUNGLElBQUksb0JBQW9CLEdBQUcsU0FBUyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7RUFDekQsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDRCxXQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDNUIsTUFBTSxHQUFHLEVBQUU7TUFDWCxDQUFDLFFBQVEsQ0FBQztNQUNWLEdBQUcsQ0FBQztFQUNSLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBRyxDQUFDQyxLQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3hGLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDakIsQ0FBQztBQUNGLElBQUksc0JBQXNCLEdBQUcsU0FBUyxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7RUFDN0QsSUFBSSxLQUFLLElBQUksRUFBRSxLQUFLbUQsYUFBVztNQUMzQixLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUdwRCxXQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDaEQsTUFBTSxHQUFHLEVBQUU7TUFDWCxDQUFDLFFBQVEsQ0FBQztNQUNWLEdBQUcsQ0FBQztFQUNSLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBR0MsS0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUdBLEtBQUcsQ0FBQ21ELGFBQVcsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQzdHLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDakIsQ0FBQzs7O0FBR0YsR0FBRyxDQUFDLFVBQVUsQ0FBQztFQUNiLE9BQU8sR0FBRyxTQUFTLE1BQU0sRUFBRTtJQUN6QixHQUFHLElBQUksWUFBWSxPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUMzRSxJQUFJLEdBQUcsR0FBR2IsS0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUMvRCxJQUFJLElBQUksR0FBRyxTQUFTLEtBQUssQ0FBQztNQUN4QixHQUFHLElBQUksS0FBS2EsYUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQ3BELEdBQUduRCxLQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJQSxLQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7TUFDekUsYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUV1QixZQUFVLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDaEQsQ0FBQztJQUNGLEdBQUcsV0FBVyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUM0QixhQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNsQixDQUFDO0VBQ0ZwQixVQUFRLENBQUMsT0FBTyxDQUFDekIsV0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsUUFBUSxFQUFFO0lBQzFELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztHQUNoQixDQUFDLENBQUM7O0VBRUgsS0FBSyxDQUFDLENBQUMsR0FBRyx5QkFBeUIsQ0FBQztFQUNwQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGVBQWUsQ0FBQztFQUMxQkQsV0FBeUIsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQztFQUMvRGYsVUFBd0IsQ0FBQyxDQUFDLElBQUkscUJBQXFCLENBQUM7RUFDcERELFdBQXlCLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFDOztFQUVyRCxHQUFHLFdBQVcsSUFBSSxDQUFDSixRQUFxQixDQUFDO0lBQ3ZDOEMsVUFBUSxDQUFDb0IsYUFBVyxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0dBQzVFOztFQUVELE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxJQUFJLENBQUM7SUFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7R0FDeEIsQ0FBQTtDQUNGOztBQUVEekQsU0FBTyxDQUFDQSxTQUFPLENBQUMsQ0FBQyxHQUFHQSxTQUFPLENBQUMsQ0FBQyxHQUFHQSxTQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0FBRTVFLElBQUksSUFBSSxPQUFPLEdBQUc7O0VBRWhCLGdIQUFnSDtFQUNoSCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUwRCxHQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUdBLEdBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDQSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRTVELElBQUksSUFBSSxPQUFPLEdBQUdoQyxPQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFZ0MsR0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHQSxHQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQ0EsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV4RjFELFNBQU8sQ0FBQ0EsU0FBTyxDQUFDLENBQUMsR0FBR0EsU0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUU7O0VBRXJELEtBQUssRUFBRSxTQUFTLEdBQUcsQ0FBQztJQUNsQixPQUFPTSxLQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUNuQixjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3hDOztFQUVELE1BQU0sRUFBRSxTQUFTLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDMUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sU0FBUyxDQUFDLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0dBQzVDO0VBQ0QsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDdkMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLEVBQUU7Q0FDekMsQ0FBQyxDQUFDOztBQUVITixTQUFPLENBQUNBLFNBQU8sQ0FBQyxDQUFDLEdBQUdBLFNBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFOztFQUVyRCxNQUFNLEVBQUUsT0FBTzs7RUFFZixjQUFjLEVBQUUsZUFBZTs7RUFFL0IsZ0JBQWdCLEVBQUUsaUJBQWlCOztFQUVuQyx3QkFBd0IsRUFBRSx5QkFBeUI7O0VBRW5ELG1CQUFtQixFQUFFLG9CQUFvQjs7RUFFekMscUJBQXFCLEVBQUUsc0JBQXNCO0NBQzlDLENBQUMsQ0FBQzs7O0FBR0gsS0FBSyxJQUFJQSxTQUFPLENBQUNBLFNBQU8sQ0FBQyxDQUFDLEdBQUdBLFNBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVU7RUFDeEUsSUFBSSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUM7Ozs7RUFJbEIsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztDQUNuRyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUU7RUFDWCxTQUFTLEVBQUUsU0FBUyxTQUFTLENBQUMsRUFBRSxDQUFDO0lBQy9CLEdBQUcsRUFBRSxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTztJQUMzQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNYLENBQUMsTUFBTSxDQUFDO1FBQ1IsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUN4QixNQUFNLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLEdBQUcsT0FBTyxRQUFRLElBQUksVUFBVSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDdEQsR0FBRyxTQUFTLElBQUksQ0FBQ21ELFNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFHLEVBQUUsS0FBSyxDQUFDO01BQ2hFLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7TUFDdEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztLQUNsQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUNuQixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ3RDO0NBQ0YsQ0FBQyxDQUFDOzs7QUFHSCxPQUFPLENBQUN2QyxXQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSXBCLEtBQWtCLENBQUMsT0FBTyxDQUFDb0IsV0FBUyxDQUFDLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQ0EsV0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXJIRSxnQkFBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzs7QUFFbENBLGdCQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFbkNBLGdCQUFjLENBQUNoQixRQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O0FDMU96Q04sVUFBd0IsQ0FBQyxlQUFlLENBQUM7O0FDQXpDQSxVQUF3QixDQUFDLFlBQVksQ0FBQzs7QUNJdEMsU0FBYyxHQUFHQSxLQUE4QixDQUFDLE1BQU07OztBQ0p0RCxjQUFjLEdBQUcsRUFBRSxTQUFTLEVBQUVBLEtBQW9DLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTs7OztBQ0F0RixZQUFZLENBQUM7O0FBRWIsa0JBQWtCLEdBQUcsSUFBSSxDQUFDOztBQUUxQixJQUFJLFNBQVMsR0FBR0QsUUFBcUMsQ0FBQzs7QUFFdEQsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRW5ELElBQUksT0FBTyxHQUFHQyxNQUE0QixDQUFDOztBQUUzQyxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFL0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxRQUFRLENBQUMsT0FBTyxLQUFLLFVBQVUsSUFBSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLEtBQUssUUFBUSxHQUFHLFVBQVUsR0FBRyxFQUFFLEVBQUUsT0FBTyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxPQUFPLFFBQVEsQ0FBQyxPQUFPLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLE9BQU8sSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQzs7QUFFeFQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFOztBQUUvRixlQUFlLEdBQUcsT0FBTyxRQUFRLENBQUMsT0FBTyxLQUFLLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRTtFQUNwSCxPQUFPLE9BQU8sR0FBRyxLQUFLLFdBQVcsR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2hFLEdBQUcsVUFBVSxHQUFHLEVBQUU7RUFDakIsT0FBTyxHQUFHLElBQUksT0FBTyxRQUFRLENBQUMsT0FBTyxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQyxPQUFPLElBQUksR0FBRyxLQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsS0FBSyxXQUFXLEdBQUcsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN6TTs7Ozs7QUNwQmMsU0FBU21FLE9BQVQsR0FBK0M7aUZBQUosRUFBSTtNQUE1QkMsUUFBNEIsUUFBNUJBLFFBQTRCO01BQWxCQyxTQUFrQixRQUFsQkEsU0FBa0I7O01BQ3pELFFBQU9DLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBckIsRUFDRTtNQUNDQSxPQUFPQyxhQUFQLEtBQXlCQyxTQUF6QixJQUFzQ0YsT0FBT0csWUFBUCxLQUF3QkQsU0FBakUsRUFBNEU7UUFDdkVKLFFBQUgsRUFDRUUsT0FBT0MsYUFBUCxHQUF1QkgsUUFBdkI7UUFDQ0MsU0FBSCxFQUNFQyxPQUFPRyxZQUFQLEdBQXNCSixTQUF0QjtXQUNLLFNBQVNLLE9BQVQsR0FBb0I7VUFDdEJOLFFBQUgsRUFDRUUsT0FBT0MsYUFBUCxHQUF1QixJQUF2QjtVQUNDRixTQUFILEVBQ0VDLE9BQU9HLFlBQVAsR0FBc0IsSUFBdEI7S0FKSjtHQUxGLE1BV08sSUFBR0wsWUFBWUMsU0FBZixFQUEwQjs7VUFDdEJNLFdBRHNCLEdBQy9CLFNBQVNBLFdBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCO1lBQ3RCQSxJQUFJQyxPQUFKLElBQWVULFFBQWxCLEVBQ0VBLFdBREYsS0FFSyxJQUFHLENBQUNRLElBQUlDLE9BQUwsSUFBZ0JSLFNBQW5CLEVBQ0hBO09BTDJCOztVQU96Qk8sTUFBTU4sT0FBT1EsVUFBUCxDQUFrQixPQUFsQixDQUFaO1VBQ0lDLFdBQUosQ0FBZ0JKLFdBQWhCOztXQUNPLFNBQVNLLFlBQVQsR0FBeUI7Y0FDMUJDLGNBQUosQ0FBbUJOLFdBQW5COzs7Ozs7R0FWRyxNQVlBO1dBQ0UsWUFBTSxFQUFiOzs7O0FDM0JKLElBQUluRSxTQUFPLEdBQUdMLE9BQW9CLENBQUM7O0FBRW5DSyxTQUFPLENBQUNBLFNBQU8sQ0FBQyxDQUFDLEdBQUdBLFNBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQ1QsWUFBeUIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxjQUFjLEVBQUVDLFNBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FDRGxILElBQUksT0FBTyxHQUFHQSxLQUE4QixDQUFDLE1BQU0sQ0FBQztBQUNwRCxvQkFBYyxHQUFHLFNBQVMrQixnQkFBYyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQ3JELE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzlDOzs7QUNKRCxjQUFjLEdBQUcsRUFBRSxTQUFTLEVBQUUvQixnQkFBb0QsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOzs7OztBQ0N0RyxJQUFJaUMsS0FBRyxHQUFHbEMsSUFBaUI7SUFDdkJtRixLQUFHLEdBQUdsRixJQUFpQixDQUFDLGFBQWEsQ0FBQztJQUV0QyxHQUFHLEdBQUdpQyxLQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFDOzs7QUFHaEUsSUFBSSxNQUFNLEdBQUcsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUFDO0VBQzVCLElBQUk7SUFDRixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNoQixDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWU7Q0FDMUIsQ0FBQzs7QUFFRixZQUFjLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNaLE9BQU8sRUFBRSxLQUFLLFNBQVMsR0FBRyxXQUFXLEdBQUcsRUFBRSxLQUFLLElBQUksR0FBRyxNQUFNOztNQUV4RCxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRWlELEtBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUM7O01BRXhELEdBQUcsR0FBR2pELEtBQUcsQ0FBQyxDQUFDLENBQUM7O01BRVosQ0FBQyxDQUFDLEdBQUdBLEtBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0NBQ2pGOztBQ3RCRCxJQUFJLE9BQU8sS0FBSzdCLFFBQXFCO0lBQ2pDK0UsVUFBUSxJQUFJaEYsSUFBaUIsQ0FBQyxVQUFVLENBQUM7SUFDekN3QixXQUFTLEdBQUc1QixVQUF1QixDQUFDO0FBQ3hDLG1CQUFjLEdBQUdDLEtBQWtCLENBQUMsVUFBVSxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzNELElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNuQixPQUFPLENBQUMsQ0FBQ21GLFVBQVEsQ0FBQyxLQUFLLFNBQVM7T0FDM0IsWUFBWSxJQUFJLENBQUM7T0FDakJ4RCxXQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzNDOztBQ05ELGdCQUFjLEdBQUczQixlQUFzQzs7O0FDRnZELGNBQWMsR0FBRyxFQUFFLFNBQVMsRUFBRUEsWUFBeUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOzs7QUNBM0YsSUFBSW9GLFNBQU8sS0FBS2hGLFFBQXFCO0lBQ2pDK0UsVUFBUSxJQUFJaEYsSUFBaUIsQ0FBQyxVQUFVLENBQUM7SUFDekN3QixXQUFTLEdBQUc1QixVQUF1QixDQUFDO0FBQ3hDLDBCQUFjLEdBQUdDLEtBQWtCLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDbEUsR0FBRyxFQUFFLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDbUYsVUFBUSxDQUFDO09BQ2pDLEVBQUUsQ0FBQyxZQUFZLENBQUM7T0FDaEJ4RCxXQUFTLENBQUN5RCxTQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3Qjs7QUNQRCxJQUFJbkUsVUFBUSxHQUFHZCxTQUF1QjtJQUNsQyxHQUFHLFFBQVFKLHNCQUFxQyxDQUFDO0FBQ3JELG9CQUFjLEdBQUdDLEtBQWtCLENBQUMsV0FBVyxHQUFHLFNBQVMsRUFBRSxDQUFDO0VBQzVELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNyQixHQUFHLE9BQU8sTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztFQUN6RSxPQUFPaUIsVUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNsQzs7QUNKRCxpQkFBYyxHQUFHakIsZ0JBQXVDOzs7QUNGeEQsY0FBYyxHQUFHLEVBQUUsU0FBUyxFQUFFQSxhQUEwQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Ozs7OztBQ0E1RixZQUFZLENBQUM7O0FBRWIsa0JBQWtCLEdBQUcsSUFBSSxDQUFDOztBQUUxQixJQUFJLFlBQVksR0FBR0QsVUFBaUMsQ0FBQzs7QUFFckQsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXhELElBQUksYUFBYSxHQUFHQyxXQUFrQyxDQUFDOztBQUV2RCxJQUFJLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFMUQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFOztBQUUvRixlQUFlLEdBQUcsWUFBWTtFQUM1QixTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO0lBQzdCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUNkLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNmLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQzs7SUFFbkIsSUFBSTtNQUNGLEtBQUssSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUU7UUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7O1FBRXBCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLE1BQU07T0FDbkM7S0FDRixDQUFDLE9BQU8sR0FBRyxFQUFFO01BQ1osRUFBRSxHQUFHLElBQUksQ0FBQztNQUNWLEVBQUUsR0FBRyxHQUFHLENBQUM7S0FDVixTQUFTO01BQ1IsSUFBSTtRQUNGLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO09BQ3pDLFNBQVM7UUFDUixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUNsQjtLQUNGOztJQUVELE9BQU8sSUFBSSxDQUFDO0dBQ2I7O0VBRUQsT0FBTyxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDdkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ3RCLE9BQU8sR0FBRyxDQUFDO0tBQ1osTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7TUFDakQsT0FBTyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzlCLE1BQU07TUFDTCxNQUFNLElBQUksU0FBUyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7S0FDN0U7R0FDRixDQUFDO0NBQ0gsRUFBRTs7Ozs7QUNsREgsSUFBSWdDLFNBQU8sS0FBSzdCLFdBQXlCO0lBQ3JDVSxXQUFTLEdBQUdkLFVBQXdCO0lBQ3BDc0YsUUFBTSxNQUFNckYsVUFBd0IsQ0FBQyxDQUFDLENBQUM7QUFDM0Msa0JBQWMsR0FBRyxTQUFTLFNBQVMsQ0FBQztFQUNsQyxPQUFPLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLElBQUksQ0FBQyxRQUFRYSxXQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3RCLElBQUksS0FBS21CLFNBQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQ3BCLENBQUMsUUFBUSxDQUFDO1FBQ1YsTUFBTSxHQUFHLEVBQUU7UUFDWCxHQUFHLENBQUM7SUFDUixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBR3FELFFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO01BQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2pELENBQUMsT0FBTyxNQUFNLENBQUM7R0FDakIsQ0FBQztDQUNIOztBQ2RELElBQUk3RSxTQUFPLElBQUlULE9BQW9CO0lBQy9CLFFBQVEsR0FBR0MsY0FBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbkRRLFNBQU8sQ0FBQ0EsU0FBTyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUU7RUFDM0IsT0FBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUMzQixPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNyQjtDQUNGLENBQUM7O0FDUEYsYUFBYyxHQUFHUixLQUE4QixDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7QUNEOUQsY0FBYyxHQUFHLEVBQUUsU0FBUyxFQUFFQSxTQUE0QyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7Ozs7O0FDQzlGLElBQUlpQixVQUFRLEdBQUdqQixTQUF1QixDQUFDO0FBQ3ZDLGFBQWMsR0FBRyxTQUFTLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztFQUNyRCxJQUFJO0lBQ0YsT0FBTyxPQUFPLEdBQUcsRUFBRSxDQUFDaUIsVUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7R0FFL0QsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNSLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixHQUFHLEdBQUcsS0FBSyxTQUFTLENBQUNBLFVBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbEQsTUFBTSxDQUFDLENBQUM7R0FDVDtDQUNGOztBQ1ZELElBQUlVLFdBQVMsSUFBSTVCLFVBQXVCO0lBQ3BDb0YsVUFBUSxLQUFLbkYsSUFBaUIsQ0FBQyxVQUFVLENBQUM7SUFDMUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7O0FBRWpDLGdCQUFjLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDM0IsT0FBTyxFQUFFLEtBQUssU0FBUyxLQUFLMkIsV0FBUyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDd0QsVUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDcEY7O0FDTkQsSUFBSUcsaUJBQWUsR0FBR3ZGLFNBQXVCO0lBQ3pDc0MsWUFBVSxRQUFRckMsYUFBMkIsQ0FBQzs7QUFFbEQsbUJBQWMsR0FBRyxTQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0VBQzdDLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQ3NGLGlCQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUVqRCxZQUFVLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7T0FDckUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztDQUM1Qjs7QUNQRCxJQUFJOEMsVUFBUSxPQUFPbkYsSUFBaUIsQ0FBQyxVQUFVLENBQUM7SUFDNUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs7QUFFekIsSUFBSTtFQUNGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNtRixVQUFRLENBQUMsRUFBRSxDQUFDO0VBQzVCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7RUFDckQsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQzNDLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZTs7QUFFekIsZUFBYyxHQUFHLFNBQVMsSUFBSSxFQUFFLFdBQVcsQ0FBQztFQUMxQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sS0FBSyxDQUFDO0VBQzlDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztFQUNqQixJQUFJO0lBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLEdBQUcsR0FBRyxDQUFDQSxVQUFRLENBQUMsRUFBRSxDQUFDO0lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN0RCxHQUFHLENBQUNBLFVBQVEsQ0FBQyxHQUFHLFVBQVUsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1gsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlO0VBQ3pCLE9BQU8sSUFBSSxDQUFDO0NBQ2I7O0FDbkJELElBQUlJLEtBQUcsY0FBYy9ELElBQWlCO0lBQ2xDaEIsU0FBTyxVQUFVaUIsT0FBb0I7SUFDckMrRCxVQUFRLFNBQVM5RCxTQUF1QjtJQUN4QyxJQUFJLGFBQWFSLFNBQXVCO0lBQ3hDLFdBQVcsTUFBTUMsWUFBMkI7SUFDNUNzRSxVQUFRLFNBQVNyRixTQUF1QjtJQUN4QyxjQUFjLEdBQUdELGVBQTZCO0lBQzlDLFNBQVMsUUFBUUosc0JBQXFDLENBQUM7O0FBRTNEUyxTQUFPLENBQUNBLFNBQU8sQ0FBQyxDQUFDLEdBQUdBLFNBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQ1IsV0FBeUIsQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFOztFQUV4RyxJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsU0FBUyw2Q0FBNkM7SUFDeEUsSUFBSSxDQUFDLFNBQVN3RixVQUFRLENBQUMsU0FBUyxDQUFDO1FBQzdCLENBQUMsU0FBUyxPQUFPLElBQUksSUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUs7UUFDbEQsSUFBSSxNQUFNLFNBQVMsQ0FBQyxNQUFNO1FBQzFCLEtBQUssS0FBSyxJQUFJLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTO1FBQzdDLE9BQU8sR0FBRyxLQUFLLEtBQUssU0FBUztRQUM3QixLQUFLLEtBQUssQ0FBQztRQUNYLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUNuQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUdELEtBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUV0RSxHQUFHLE1BQU0sSUFBSSxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO01BQzdELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNyRixjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUN4RztLQUNGLE1BQU07TUFDTCxNQUFNLEdBQUdFLFVBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNsRCxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztPQUM1RTtLQUNGO0lBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsT0FBTyxNQUFNLENBQUM7R0FDZjtDQUNGLENBQUMsQ0FBQzs7QUNsQ0gsVUFBYyxHQUFHekYsS0FBOEIsQ0FBQyxLQUFLLENBQUMsSUFBSTs7O0FDRjFELGNBQWMsR0FBRyxFQUFFLFNBQVMsRUFBRUEsTUFBd0MsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFOzs7O0FDQTFGLFlBQVksQ0FBQzs7QUFFYixrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRTFCLElBQUksS0FBSyxHQUFHQSxNQUFnQyxDQUFDOztBQUU3QyxJQUFJLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFM0MsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFOztBQUUvRixlQUFlLEdBQUcsVUFBVSxHQUFHLEVBQUU7RUFDL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO01BQzdELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEI7O0lBRUQsT0FBTyxJQUFJLENBQUM7R0FDYixNQUFNO0lBQ0wsT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0dBQ2pDO0NBQ0Y7Ozs7O0FDcEJELElBQUlPLE1BQUksR0FBR1AsS0FBa0IsQ0FBQztBQUM5QixnQkFBYyxHQUFHLFNBQVMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7RUFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDakIsR0FBRyxJQUFJLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekNPLE1BQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQ2xDLENBQUMsT0FBTyxNQUFNLENBQUM7Q0FDakI7O0FDTkQsZUFBYyxHQUFHLFNBQVMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDO0VBQzlELEdBQUcsRUFBRSxFQUFFLFlBQVksV0FBVyxDQUFDLEtBQUssY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEYsTUFBTSxTQUFTLENBQUMsSUFBSSxHQUFHLHlCQUF5QixDQUFDLENBQUM7R0FDbkQsQ0FBQyxPQUFPLEVBQUUsQ0FBQztDQUNiOzs7QUNKRCxJQUFJLEdBQUcsV0FBV1csSUFBaUI7SUFDL0IsSUFBSSxVQUFVQyxTQUF1QjtJQUNyQyxXQUFXLEdBQUdmLFlBQTJCO0lBQ3pDLFFBQVEsTUFBTUQsU0FBdUI7SUFDckMsUUFBUSxNQUFNSixTQUF1QjtJQUNyQyxTQUFTLEtBQUtDLHNCQUFxQztJQUNuRCxLQUFLLFNBQVMsRUFBRTtJQUNoQixNQUFNLFFBQVEsRUFBRSxDQUFDO0FBQ3JCLElBQUksT0FBTyxHQUFHLGNBQWMsR0FBRyxTQUFTLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7RUFDNUUsSUFBSSxNQUFNLEdBQUcsUUFBUSxHQUFHLFVBQVUsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztNQUN4RSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDdkMsS0FBSyxJQUFJLENBQUM7TUFDVixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7RUFDbkMsR0FBRyxPQUFPLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxTQUFTLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDLENBQUM7O0VBRS9FLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNyRixNQUFNLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4RixHQUFHLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxPQUFPLE1BQU0sQ0FBQztHQUN4RCxNQUFNLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxHQUFHO0lBQzVFLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELEdBQUcsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLE9BQU8sTUFBTSxDQUFDO0dBQ3hEO0NBQ0YsQ0FBQztBQUNGLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTTs7O0FDdkJ2QixJQUFJTSxRQUFNLFFBQVFhLE9BQW9CO0lBQ2xDUyxNQUFJLFVBQVV4QixLQUFrQjtJQUNoQ0MsSUFBRSxZQUFZRixTQUF1QjtJQUNyQ3VGLGFBQVcsR0FBRzNGLFlBQXlCO0lBQ3ZDLE9BQU8sT0FBT0MsSUFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFL0MsZUFBYyxHQUFHLFNBQVMsR0FBRyxDQUFDO0VBQzVCLElBQUksQ0FBQyxHQUFHLE9BQU80QixNQUFJLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxHQUFHQSxNQUFJLENBQUMsR0FBRyxDQUFDLEdBQUd0QixRQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakUsR0FBR29GLGFBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUNyRixJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUU7SUFDbEQsWUFBWSxFQUFFLElBQUk7SUFDbEIsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFO0dBQ2hDLENBQUMsQ0FBQztDQUNKOztBQ1pELElBQUlBLElBQUUsWUFBWTBELFNBQXVCLENBQUMsQ0FBQztJQUN2QzFDLFFBQU0sUUFBUTJDLGFBQTJCO0lBQ3pDLFdBQVcsR0FBR3pDLFlBQTBCO0lBQ3hDZ0UsS0FBRyxXQUFXL0QsSUFBaUI7SUFDL0IsVUFBVSxJQUFJQyxXQUF5QjtJQUN2Q2YsU0FBTyxPQUFPZ0IsUUFBcUI7SUFDbkMsS0FBSyxTQUFTUixNQUFvQjtJQUNsQyxXQUFXLEdBQUdDLFdBQXlCO0lBQ3ZDd0UsTUFBSSxVQUFVdkYsU0FBdUI7SUFDckMsVUFBVSxJQUFJRCxXQUF5QjtJQUN2Q3VGLGFBQVcsR0FBRzNGLFlBQXlCO0lBQ3ZDNkYsU0FBTyxPQUFPNUYsS0FBa0IsQ0FBQyxPQUFPO0lBQ3hDLElBQUksVUFBVTBGLGFBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDOztBQUU5QyxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksRUFBRSxHQUFHLENBQUM7O0VBRWhDLElBQUksS0FBSyxHQUFHRSxTQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDO0VBQ2hDLEdBQUcsS0FBSyxLQUFLLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7O0VBRXZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFDLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLENBQUM7R0FDaEM7Q0FDRixDQUFDOztBQUVGLHFCQUFjLEdBQUc7RUFDZixjQUFjLEVBQUUsU0FBUyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7SUFDcEQsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLFFBQVEsQ0FBQztNQUN0QyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBR3ZFLFFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUN2QixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztNQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztNQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ2YsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNyRSxDQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTs7O01BR3ZCLEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtRQUNyQixJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7VUFDM0UsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7VUFDZixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7VUFDM0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FB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
