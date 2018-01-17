'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xss = exports.md = exports.getMD5 = exports.getClientIp = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getClientIp = function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

var getMD5 = function getMD5(str) {
  var result = '';
  var md5 = _crypto2.default.createHash('md5');
  result = md5.update(str).digest('hex');
  return result;
};

var md = new _markdownIt2.default();

md.set({
  HTML: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: false, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true // Enable smartypants and other sweet transforms
});

var xss = new _xss2.default.FilterXSS({
  onIgnoreTagAttr: function onIgnoreTagAttr(tag, name, value) {
    if (tag === 'pre' && name === 'class') {
      return name + '="' + _xss2.default.escapeAttrValue(value) + '"';
    }
  }
});

exports.getClientIp = getClientIp;
exports.getMD5 = getMD5;
exports.md = md;
exports.xss = xss;
//# sourceMappingURL=tool.js.map