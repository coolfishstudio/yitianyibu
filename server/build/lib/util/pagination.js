"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 格式化页码
 */
var getFromReq = function getFromReq() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultLimit = arguments[1];

  var offset = parseInt(query.offset, 10);
  if (isNaN(offset) || offset < 0) {
    offset = 0;
  }
  var limit = parseInt(query.limit, 10);
  if (isNaN(limit) || limit === 0 || limit < -1 || limit > defaultLimit) {
    limit = defaultLimit;
  }
  return {
    offset: offset,
    limit: limit
  };
};

var getMeta = function getMeta(totalLength, currentLength, pagination) {
  return {
    offset: pagination.offset,
    limit: pagination.limit,
    total: totalLength,
    length: currentLength,
    remaining: currentLength === 0 ? 0 : totalLength - pagination.offset - currentLength
  };
};

exports.getFromReq = getFromReq;
exports.getMeta = getMeta;
//# sourceMappingURL=pagination.js.map