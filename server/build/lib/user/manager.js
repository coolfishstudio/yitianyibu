'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _config = require('../../config');

var _tool = require('../util/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insert = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _model2.default.create(options);

          case 2:
            result = _context.sent;
            return _context.abrupt('return', result);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function insert() {
    return _ref.apply(this, arguments);
  };
}();

var getUserByEmail = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(email) {
    var getResult;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _model2.default.findOne({ email: email });

          case 2:
            getResult = _context2.sent;
            return _context2.abrupt('return', getResult);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getUserByEmail(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserById = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
    var getResult;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _model2.default.findById(id);

          case 2:
            getResult = _context3.sent;
            return _context3.abrupt('return', getResult);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getUserById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var initUser = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var options, findResult, initResult;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = {
              username: _config.ADMIN_USERNAME,
              password: _config.ADMIN_PASSWORD,
              email: _config.ADMIN_EMAIL
            };

            console.log('\u68C0\u67E5\u7BA1\u7406\u5458\u521D\u59CB\u5316 \u7BA1\u7406\u5458\u8D26\u6237 [' + _config.ADMIN_EMAIL + ']');
            _context4.next = 4;
            return getUserByEmail(options.email);

          case 4:
            findResult = _context4.sent;

            if (!findResult) {
              _context4.next = 8;
              break;
            }

            // 管理员账户已存在
            console.log('\u7BA1\u7406\u5458\u8D26\u6237\u5DF2\u5B58\u5728 \u7BA1\u7406\u5458\u8D26\u6237 [' + _config.ADMIN_EMAIL + ']');
            return _context4.abrupt('return', null);

          case 8:
            console.log('\u7BA1\u7406\u5458\u8D26\u6237\u4E0D\u5B58\u5728 \u5F00\u59CB\u521D\u59CB\u5316 \u7BA1\u7406\u5458\u8D26\u6237 [' + _config.ADMIN_EMAIL + ']');
            options.password = (0, _tool.getMD5)(options.password);
            _context4.next = 12;
            return insert(options);

          case 12:
            initResult = _context4.sent;

            console.log('管理员账户初始化结束');
            return _context4.abrupt('return', null);

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function initUser() {
    return _ref4.apply(this, arguments);
  };
}();

exports.default = {
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
  initUser: initUser
};
//# sourceMappingURL=manager.js.map