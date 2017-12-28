'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _busboy = require('busboy');

var _busboy2 = _interopRequireDefault(_busboy);

var _db = require('../../middleware/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFileStreamByID = function getFileStreamByID(id, callback) {
  callback(null, _db.gfs.createReadStream({ _id: id }));
};

var getFileInfoByID = function getFileInfoByID(id, callback) {
  _db.gfs.findOne({ _id: id }, function (error, file) {
    if (error) return callback(error);
    if (file) {
      file.id = file._id;
      delete file._id;
    }
    callback(null, file);
  });
};

var getFileInfoByMD5 = function getFileInfoByMD5(md5, callback) {
  _db.gfs.findOne({ md5: md5 }, function (error, file) {
    if (error) return callback(error);
    if (file) {
      file.id = file._id;
      delete file._id;
    }
    callback(null, file);
  });
};

var saveFile = function saveFile(headers, callback) {
  var files = [];
  var num = 0;
  var finished = false;
  var busboy = new _busboy2.default({ headers: headers });

  busboy.on('file', function (fieldname, file, name, encoding, mimetype) {
    (function (index) {
      var writestream = _db.gfs.createWriteStream({
        filename: name,
        content_type: mimetype
      });
      file.pipe(writestream);
      writestream.on('close', function (result) {
        result.id = result._id;
        delete result._id;
        if (result.length !== 0) {
          files[index] = result;
        }
        if (--num === 0 && finished) {
          callback(null, files);
        }
      });
    })(num++);
  });
  busboy.on('finish', function () {
    finished = true;
    if (!num) {
      callback(null, files);
    }
  });
  return busboy;
};

exports.default = {
  getFileInfoByID: getFileInfoByID,
  getFileInfoByMD5: getFileInfoByMD5,
  getFileStreamByID: getFileStreamByID,
  saveFile: saveFile
};
//# sourceMappingURL=manager.js.map