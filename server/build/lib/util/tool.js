'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMD5 = exports.getClientIp = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

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

exports.getClientIp = getClientIp;
exports.getMD5 = getMD5;
//# sourceMappingURL=tool.js.map