'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _format = require('../util/format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFileById = function getFileById(req, res, next) {
  _manager2.default.getFileInfoByID(req.params.id, function (error, fileInfo) {
    if (error) return next(error);
    if (!fileInfo) {
      var _error = new Error('Image not found in the database.');
      _error.status = 404;
      _error.code = 100001;
      return next(_error);
    }
    _manager2.default.getFileStreamByID(req.params.id, function (error, stream) {
      if (error) return next(error);
      stream.pipe(res);
    });
  });
};

var saveFile = function saveFile(req, res, next) {
  if (/^multipart\/form-data/i.test(req.headers['content-type']) || /^application\/x-www-form-urlencoded/i.test(req.headers['content-type'])) {
    req.pipe(_manager2.default.saveFile(req.headers, function (error, result) {
      res.json((0, _format.formatResult)(result));
    }));
  } else {
    var error = new Error('Image content-type not form-data or x-www-form-urlencoded.');
    error.status = 400;
    error.code = 100002;
    return next(error);
  }
};

exports.default = {
  getFileById: getFileById,
  saveFile: saveFile
};
//# sourceMappingURL=controller.js.map