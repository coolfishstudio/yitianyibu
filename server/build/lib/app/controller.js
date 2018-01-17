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
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.APP_LIMIT_DEFAULT));

          case 3:
            result = _context.sent;

            res.json((0, _format.formatResult)(result));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            next((0, _format.handlerCustomError)(107001, '查询失败'));

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

var recordById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _manager2.default.recordById(req.params.id);

          case 3:
            result = _context2.sent;

            res.json((0, _format.formatResult)({}));
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            next((0, _format.handlerCustomError)(107002, '记录失败'));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function recordById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var insert = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var name, title, desc, url, type, icon, cover, createdByID, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = (req.body.name || '').trim();
            title = (req.body.title || '').trim();
            desc = (req.body.desc || '').trim();
            url = (req.body.url || '').trim();
            type = parseInt(req.body.type) || 0;
            icon = (req.body.icon || '').trim();
            cover = (req.body.cover || '').trim();
            createdByID = req.user.id;

            if (!name) {
              next((0, _format.handlerCustomError)(107005, '名称不能为空'));
            }
            if (!title) {
              next((0, _format.handlerCustomError)(107006, '标题不能为空'));
            }
            if (!url) {
              next((0, _format.handlerCustomError)(107007, '外链不能为空'));
            }
            if (!icon) {
              next((0, _format.handlerCustomError)(107008, '请上传图标'));
            }
            if (!cover) {
              next((0, _format.handlerCustomError)(107009, '请上传封面'));
            }
            if (!createdByID) {
              next((0, _format.handlerCustomError)(107010, '非法用户操作'));
            }
            _context3.prev = 14;
            _context3.next = 17;
            return _manager2.default.insert({ name: name, title: title, desc: desc, url: url, icon: icon, type: type, cover: cover, createdByID: createdByID });

          case 17:
            result = _context3.sent;

            res.json((0, _format.formatResult)());
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3['catch'](14);

            console.log(_context3.t0);
            next((0, _format.handlerCustomError)(107003, '创建失败'));

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[14, 21]]);
  }));

  return function insert(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  recordById: recordById,
  insert: insert
};
//# sourceMappingURL=controller.js.map