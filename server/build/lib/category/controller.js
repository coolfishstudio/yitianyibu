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
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.CATEGORY_LIMIT_DEFAULT));

          case 3:
            result = _context.sent;

            res.json((0, _format.formatResult)(result));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            next((0, _format.handlerCustomError)(102003, '查询失败'));

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
    var name, pathname, desc, weight, cover, createdByID, getCategoryByPathname, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = (req.body.name || '').trim();
            pathname = (req.body.pathname || '').trim();
            desc = (req.body.desc || '').trim();
            weight = parseInt(req.body.weight) || 1;
            cover = (req.body.cover || '').trim();
            createdByID = req.user.id;

            if (!name) {
              next((0, _format.handlerCustomError)(102001, '名称不能为空'));
            }
            if (pathname && !/^[a-zA-Z0-9-_]+$/.test(pathname)) {
              next((0, _format.handlerCustomError)(102004, '请输入合法的自定义链接'));
            }
            if (!createdByID) {
              next((0, _format.handlerCustomError)(102005, '非法用户操作'));
            }
            _context2.prev = 9;

            if (!pathname) {
              _context2.next = 16;
              break;
            }

            _context2.next = 13;
            return _manager2.default.getByPathname(pathname);

          case 13:
            getCategoryByPathname = _context2.sent;

            if (!getCategoryByPathname) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt('return', next((0, _format.handlerCustomError)(102006, '自定义链接重复')));

          case 16:
            _context2.next = 18;
            return _manager2.default.insert({ name: name, pathname: pathname, desc: desc, weight: weight, cover: cover, createdByID: createdByID });

          case 18:
            result = _context2.sent;

            res.json((0, _format.formatResult)());
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](9);

            console.log(_context2.t0);
            next((0, _format.handlerCustomError)(102002, '创建失败'));

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[9, 22]]);
  }));

  return function insert(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  insert: insert
};
//# sourceMappingURL=controller.js.map