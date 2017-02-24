'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMD5 = function getMD5(str) {
    var result = '';
    var md5 = _crypto2.default.createHash('md5');
    result = md5.update(str).digest('hex');
    return result;
};

exports.default = {
    getMD5: getMD5
};