'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onReady = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _log = require('../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONGO_URL = process.env.MONGO_URL;

// 连接数据库

_mongoose2.default.connect(MONGO_URL, // 数据库地址
{
    db: {
        native_parser: true
    },
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});

var db = _mongoose2.default.connection;
var isReady = false;
var readyWaitingList = [];

// 始终监听报错信息
db.on('error', function (error) {
    (0, _log2.default)('db').error('\u6570\u636E\u5E93\u8FDE\u63A5\u5F02\u5E38\uFF1A' + error);
});
// 监听一次连接成功信息
db.once('open', function () {
    (0, _log2.default)('db').info('数据库已建立连接。');
    isReady = true;
    for (var i = 0, l = readyWaitingList.length; i < l; i += 1) {
        readyWaitingList[i]();
    }
    readyWaitingList = null;
});

// 用于检测数据库是否正常连接
var onReady = exports.onReady = function onReady(callback) {
    if (isReady) return callback();
    readyWaitingList.push(callback);
};

exports.default = _mongoose2.default;