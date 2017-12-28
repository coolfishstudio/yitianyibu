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
            _context.next = 2;
            return _manager2.default.findAll((0, _pagination.getFromReq)(req.query, _const.APP_LIMIT_DEFAULT));

          case 2:
            result = _context.sent;

            res.json((0, _format.formatResult)(result));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function findAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _manager2.default.getById(req.params.id);

          case 2:
            result = _context2.sent;

            res.json((0, _format.formatResult)(result));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var insert = function insert(req, res, next) {
  var name = (req.body.name || '').trim();
  var title = (req.body.title || '').trim();
  var pathname = (req.body.pathname || '').trim();
  var logo = (req.body.logo || '').trim();
  var cover = (req.body.cover || '').trim();
  var url = (req.body.url || '').trim();
  var desc = (req.body.desc || '').trim();
  var type = (req.body.type || '0').trim();
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
};

var updateById = function updateById(req, res, next) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
};

var removeById = function removeById(req, res, next) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
};

exports.default = {
  findAll: findAll,
  getById: getById,
  insert: insert,
  updateById: updateById,
  removeById: removeById
};
//# sourceMappingURL=controller.js.map