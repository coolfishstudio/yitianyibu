'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getClientIp = function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

exports.getClientIp = getClientIp;
//# sourceMappingURL=tool.js.map