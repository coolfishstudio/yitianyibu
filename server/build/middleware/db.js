'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gfs = exports.mongoose = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _gridfsStream = require('gridfs-stream');

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _config = require('../config');

var _manager = require('../lib/user/manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('' + _config.MONGO_URL + _config.MONGO_DB);

var conn = _mongoose2.default.connection;
_gridfsStream2.default.mongo = _mongoose2.default.mongo;

conn.on('error', function (error) {
  console.error('连接错误:', error);
});
conn.once('open', function () {
  console.log('\u6570\u636E\u5E93\u5DF2\u8FDE\u63A5 \u6570\u636E\u5E93 [' + _config.MONGO_DB + ']');
  _manager2.default.initUser();
});

var gfs = (0, _gridfsStream2.default)(conn.db);

exports.mongoose = _mongoose2.default;
exports.gfs = gfs;
//# sourceMappingURL=db.js.map