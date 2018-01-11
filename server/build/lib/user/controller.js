'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _tool = require('../util/tool');

var _format = require('../util/format');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var email, password, result, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email || '';
            password = req.body.password || '';

            if (!email) {
              next((0, _format.handlerCustomError)(101001, '请输入账号'));
            }
            if (!password) {
              next((0, _format.handlerCustomError)(101002, '请输入密码'));
            }
            _context.prev = 4;
            _context.next = 7;
            return _manager2.default.getUserByEmail(email);

          case 7:
            result = _context.sent;

            if (!result) {
              next((0, _format.handlerCustomError)(101003, '用户不存在'));
            } else if ((0, _tool.getMD5)(password) !== result.password) {
              next((0, _format.handlerCustomError)(101004, '密码不正确'));
            } else {
              payload = { id: result._id };

              res.json((0, _format.formatResult)({ token: _jwtSimple2.default.encode(payload, _config.JWT_SECRET) }));
            }
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](4);

            next((0, _format.handlerCustomError)(101000, '登录失败'));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 11]]);
  }));

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  login: login
};
//# sourceMappingURL=controller.js.map