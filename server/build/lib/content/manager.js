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
            return _model2.default.count((0, _assign2.default)({ removed: false }, options));

          case 2:
            total = _context.sent;

            options = (0, _assign2.default)(options, { removed: false });
            list = [];

            if (!(queryOptions.limit === -1)) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return _model2.default.find(options).sort({ createdAt: -1 });

          case 8:
            list = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.next = 13;
            return _model2.default.find(options).limit(queryOptions.limit).skip(queryOptions.offset).sort({ createdAt: -1 });

          case 13:
            list = _context.sent;

          case 14:
            return _context.abrupt('return', {
              meta: (0, _pagination.getMeta)(total, list.length, queryOptions),
              list: list
            });

          case 15:
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

var getById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
    var result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _model2.default.findById(id);

          case 2:
            result = _context2.sent;
            return _context2.abrupt('return', result);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getById(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var hitById = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id) {
    var analyse, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _model2.default.findById(id);

          case 2:
            analyse = _context3.sent;

            if (analyse) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', null);

          case 5:
            ++analyse.hits;
            _context3.next = 8;
            return analyse.save();

          case 8:
            result = _context3.sent;
            return _context3.abrupt('return', result);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function hitById(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var getNearByCreatedAt = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(createdAt) {
    var prev, next;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _model2.default.findOne({ removed: false, createdAt: { $lt: createdAt } }).sort({ _id: -1 });

          case 2:
            prev = _context4.sent;
            _context4.next = 5;
            return _model2.default.findOne({ removed: false, createdAt: { $gt: createdAt } }).sort({ _id: 1 });

          case 5:
            next = _context4.sent;
            return _context4.abrupt('return', {
              prev: prev,
              next: next
            });

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getNearByCreatedAt(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var insert = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _model2.default.create((0, _assign2.default)({}, options));

          case 2:
            result = _context5.sent;
            return _context5.abrupt('return', result);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function insert() {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  getById: getById,
  hitById: hitById,
  getNearByCreatedAt: getNearByCreatedAt,
  insert: insert
};
//# sourceMappingURL=manager.js.map