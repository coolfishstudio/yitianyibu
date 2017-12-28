'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handler404 = function handler404(req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  error.code = 404;
  next(error);
};

var handlerError = function handlerError(error, req, res, next) {
  var message = error.message || '发生了一个很奇怪的错误...';
  var status = error.status || 500;
  res.status(status).json({
    status: {
      code: error.code || status,
      message: message
    }
  });
};

exports.handler404 = handler404;
exports.handlerError = handlerError;
//# sourceMappingURL=error.js.map