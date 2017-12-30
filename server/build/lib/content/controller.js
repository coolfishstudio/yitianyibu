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
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.CONTENT_LIMIT_DEFAULT));

          case 3:
            result = _context.sent;

            console.log(result);
            result.map(function (item) {
              delete item.html;
              delete item.markdown;
              delete item.images;
              delete item.tag;
              delete item.status;
              delete item.featured;
              delete item.removed;
              delete item.createdByID;
              return item;
            });
            res.json((0, _format.formatResult)(result));
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            next((0, _format.handlerCustomError)(104001, '查询失败'));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function findAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var findAllByCategory = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var result;
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

            result.map(function (item) {
              delete item.html;
              delete item.markdown;
              delete item.images;
              delete item.tag;
              delete item.status;
              delete item.featured;
              delete item.removed;
              delete item.createdByID;
              return item;
            });
            res.json((0, _format.formatResult)(result));
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            next((0, _format.handlerCustomError)(104002, '查询失败'));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
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