'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _utility = require('utility');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var uploadImagePath = 'images/homepage';
var uploadContentImagePath = 'images/content';

var uploadImage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            var form = new _formidable2.default.IncomingForm();
                            form.parse(req, function (error, fields, files) {
                                if (error) {
                                    reject(error);
                                }
                                var ms = new Date().getTime();
                                fields.ms = ms;
                                /* eslint-disable */
                                for (var item in files) {
                                    if (!files[item].name) {
                                        fields[item] = '';
                                    } else {
                                        var types = files[item].name.split('.');
                                        var imagePath = uploadImagePath + '/' + (fields.path || 'temp') + '/' + ms + '_' + item + '.' + String(types[types.length - 1]);
                                        fields[item] = './' + imagePath;
                                        _fs2.default.renameSync(files[item].path, './public/' + imagePath);
                                    }
                                }
                                /* eslint-enable */
                                resolve(fields);
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function uploadImage(_x) {
        return _ref.apply(this, arguments);
    };
}();

var uploadContentImage = function uploadContentImage(file, options, callback) {
    var filename = options.filename;
    var newFilename = _utility2.default.md5(filename + String(new Date().getTime())) + _path2.default.extname(filename);

    var filePath = _path2.default.join('./public/' + uploadContentImagePath, newFilename);
    var fileUrl = '/' + uploadContentImagePath + '/' + newFilename;

    file.on('end', function () {
        callback(null, {
            url: fileUrl
        });
    });
    file.pipe(_fs2.default.createWriteStream(filePath));
};

exports.default = {
    uploadImage: uploadImage,
    uploadContentImage: uploadContentImage
};