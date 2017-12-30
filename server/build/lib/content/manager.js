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

exports.default = {
  findAll: findAll
};
//# sourceMappingURL=manager.js.map