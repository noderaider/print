'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveDocument;
function resolveDocument(obj) {
  if (obj.contentDocument) return obj.contentDocument;else if (obj.contentWindow) return obj.contentWindow.contentDocument;else if (obj.document) return obj.document;
  throw new Error('resolveDocument found no document object');
}