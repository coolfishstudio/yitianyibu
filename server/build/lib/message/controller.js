'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _pagination = require('../util/pagination');

var _format = require('../util/format');

var _const = require('../util/const');

var _tool = require('../util/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findAll = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.MESSAGE_LIMIT_DEFAULT));

          case 3:
            result = _context.sent;

            res.json((0, _format.formatResult)(result));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            next((0, _format.handlerCustomError)(107003, '查询失败'));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function findAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var insert = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var ip, name, email, content, adds, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ip = (0, _tool.getClientIp)(req);
            name = (req.body.name || '').trim();
            email = (req.body.email || '').trim();
            content = (req.body.content || '').trim();

            if (!content.length) {
              next((0, _format.handlerCustomError)(107001, '内容不能为空'));
            }
            if (name === '') {
              adds = ip.split('.');

              adds[adds.length - 1] = '*';
              name = adds.join('.');
            }
            _context2.prev = 6;
            _context2.next = 9;
            return _manager2.default.insert({ ip: ip, name: name, email: email, content: content });

          case 9:
            result = _context2.sent;

            res.json((0, _format.formatResult)());
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](6);

            next((0, _format.handlerCustomError)(107002, '创建失败'));

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[6, 13]]);
  }));

  return function insert(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var removeById = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _manager2.default.removeById(req.params.id);

          case 3:
            result = _context3.sent;

            res.json((0, _format.formatResult)());
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            next((0, _format.handlerCustomError)(107004, '删除失败'));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function removeById(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  insert: insert,
  removeById: removeById
};
//# sourceMappingURL=controller.js.map