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

var _manager3 = require('../category/manager');

var _manager4 = _interopRequireDefault(_manager3);

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
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.CONTENT_LIMIT_DEFAULT));

          case 3:
            result = _context.sent;

            result.list = result.list.map(function (item) {
              return {
                _id: item._id,
                createdAt: item.createdAt,
                hits: item.hits,
                title: item.title
              };
            });
            res.json((0, _format.formatResult)(result));
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            next((0, _format.handlerCustomError)(104001, '查询失败'));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function findAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var findAllByCategory = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var result, categoryInfo;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.CONTENT_LIMIT_DEFAULT), {
              category: req.params.id
            });

          case 3:
            result = _context2.sent;

            result.list = result.list.map(function (item) {
              return {
                _id: item._id,
                createdAt: item.createdAt,
                hits: item.hits,
                title: item.title
              };
            });
            _context2.next = 7;
            return _manager4.default.getById(req.params.id);

          case 7:
            categoryInfo = _context2.sent;

            result.info = categoryInfo;
            res.json((0, _format.formatResult)(result));
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);

            next((0, _format.handlerCustomError)(104002, '查询失败'));

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 12]]);
  }));

  return function findAllByCategory(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  findAllByCategory: findAllByCategory
};
//# sourceMappingURL=controller.js.map