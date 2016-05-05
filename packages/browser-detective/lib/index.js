'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectBrowser = exports.detectUserAgent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _chai = require('chai');

var tridentRegex = /Trident\/(\d+)/i;
var msieRegex = /MSIE (\d+)/i;
var chromeRegex = /Chrome\/(\d+)/i;
var firefoxRegex = /Firefox\/(\d+)/i;
var safariRegex = /Safari\/(\d+)/i;

var windowsRegex = /Windows (NT \d\.\d+|Windows 9[\d]|Windows 98; Win 9x 4\.90|Windows CE)/i;

/** Trident represents the actual browser version. */
var tridentMap = new Map([['8', 11], ['7', 11], ['6', 10], ['5', 9], ['4', 8]]);

var windowsMap = new Map([['NT 6.3', '8.1'], ['NT 6.2', '8'], ['NT 6.1', '7'], ['NT 6.0', 'Vista'], ['NT 5.2', 'Server 2003'], ['NT 5.1', 'XP'], ['NT 5.01', '2000 SP1'], ['NT 5.0', '2000'], ['NT 4.0', 'NT 4.0'], ['98; Win 9x 4.90', 'ME'], ['98', '98'], ['95', '95'], ['CE', 'CE']]);

var findMatch = function findMatch(regex, input) {
  var result = regex.exec(input);
  if (result && result.length > 1) return result[1];
};

var detectUserAgent = exports.detectUserAgent = function detectUserAgent() {
  (0, _chai.assert)((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object', 'user agent can only be detected in browser environment');
  _chai.assert.ok(window.navigator, 'window.navigator is required for user agent detection');
  _chai.assert.ok(window.navigator.userAgent, 'window.navigator is required for user agent detection');
  return window.navigator.userAgent;
};

var detectBrowser = exports.detectBrowser = function detectBrowser() {
  var userAgent = arguments.length <= 0 || arguments[0] === undefined ? detectUserAgent() : arguments[0];

  var trident = findMatch(tridentRegex, userAgent);
  var msie = findMatch(msieRegex, userAgent);
  var chrome = findMatch(chromeRegex, userAgent);
  var firefox = findMatch(firefoxRegex, userAgent);
  var safari = findMatch(safariRegex, userAgent);

  var name = null;
  var title = null;
  var version = null;
  var emulatedVersion = null;
  var platform = null;
  var platformVersion = null;

  if (trident || msie) {
    name = 'ie';
    title = 'Internet Explorer';
    version = trident ? tridentMap.get(trident) : msie;
    emulatedVersion = msie || version;

    var windowsPlatform = findMatch(windowsRegex, userAgent);
    if (windowsPlatform) {
      platform = 'Windows';
      platformVersion = windowsMap.get(windowsPlatform);
    }
  } else if (chrome) {
    name = 'chrome';
    title = 'Chrome';
    version = chrome;
    emulatedVersion = chrome;
  } else if (firefox) {
    name = 'firefox';
    title = 'Firefox';
    version = firefox;
    emulatedVersion = firefox;
  } else if (safari) {
    name = 'safari';
    title = 'Safari';
    version = safari;
    emulatedVersion = safari;
  }
  return { name: name, title: title, version: version, emulatedVersion: emulatedVersion, platform: platform, platformVersion: platformVersion };
};