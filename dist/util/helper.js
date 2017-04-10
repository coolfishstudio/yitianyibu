'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.qrHelper = exports.getClientIp = exports.xss = exports.md = exports.getMD5 = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _xss = require('xss');

var _xss2 = _interopRequireDefault(_xss);

var _qrImage = require('qr-image');

var _qrImage2 = _interopRequireDefault(_qrImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    typographer: true });

var xss = new _xss2.default.FilterXSS({
    onIgnoreTagAttr: function onIgnoreTagAttr(tag, name, value) {
        if (tag === 'pre' && name === 'class') {
            return name + '="' + _xss2.default.escapeAttrValue(value) + '"';
        }
    }
});
var getClientIp = function getClientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};
/**
 * 生成二维码
 */
var qrHelper = function qrHelper(url, callback) {
    var qrImg = _qrImage2.default.image(url, { type: 'png', parse_url: true, margin: 1, size: 6 });
    callback(null, qrImg);
};

exports.getMD5 = getMD5;
exports.md = md;
exports.xss = xss;
exports.getClientIp = getClientIp;
exports.qrHelper = qrHelper;