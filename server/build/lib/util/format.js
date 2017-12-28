'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatResult = function formatResult(result) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return {
    status: {
      code: code,
      message: 'success'
    },
    result: result
  };
};

var handlerCustomError = function handlerCustomError(code, message) {
  var error = new Error(message);
  error.status = 400;
  error.code = code;
  return error;
};

exports.formatResult = formatResult;
exports.handlerCustomError = handlerCustomError;
//# sourceMappingURL=format.js.map