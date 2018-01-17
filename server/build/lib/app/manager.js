'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _pagination = require('../util/pagination');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findAll = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var queryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var total, list;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _model2.default.count({ removed: false });

          case 2:
            total = _context.sent;

            options = (0, _assign2.default)(options, { removed: false });
            _context.next = 6;
            return _model2.default.find(options).limit(queryOptions.limit).skip(queryOptions.offset).sort({ createdAt: -1 });

          case 6:
            list = _context.sent;
            return _context.abrupt('return', {
              meta: (0, _pagination.getMeta)(total, list.length, queryOptions),
              list: list
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function findAll() {
    return _ref.apply(this, arguments);
  };
}();

var recordById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(appId) {
    var analyse, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _model2.default.findById(appId);

          case 2:
            analyse = _context2.sent;

            if (analyse) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', null);

          case 5:
            ++analyse.hits;
            _context2.next = 8;
            return analyse.save();

          case 8:
            result = _context2.sent;
            return _context2.abrupt('return', result);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function recordById(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var insert = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _model2.default.create((0, _assign2.default)({}, options));

          case 2:
            result = _context3.sent;
            return _context3.abrupt('return', result);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function insert() {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  recordById: recordById,
  insert: insert
};
//# sourceMappingURL=manager.js.map