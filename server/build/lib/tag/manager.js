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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findOneAndCreate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log();
            _context.next = 3;
            return _model2.default.findOne({ name: name });

          case 3:
            result = _context.sent;

            if (result) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return _model2.default.create((0, _assign2.default)({ name: name }, options));

          case 7:
            result = _context.sent;

          case 8:
            return _context.abrupt('return', result);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function findOneAndCreate(_x) {
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

exports.default = {
  findOneAndCreate: findOneAndCreate,
  getById: getById
};
//# sourceMappingURL=manager.js.map