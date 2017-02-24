'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signin = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var email, password, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        email = req.body.email || '';
                        password = req.body.password || '';

                        if (!(!email || !password)) {
                            _context.next = 6;
                            break;
                        }

                        err = new Error('参数不足');

                        err.status = 400;
                        return _context.abrupt('return', next(err));

                    case 6:
                        _manager2.default.login(req, res, function (error) {
                            if (error) return next(error);
                            res.redirect('/admin');
                        });

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function signin(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var signout = function signout(req, res) {
    req.logout();
    res.redirect('/');
};

var viewAdminLogin = function viewAdminLogin(req, res) {
    (0, _log2.default)('auth_controller').info('访问后台登录页');
    res.renderAdminPage('login');
};

exports.default = {
    signin: signin,
    signout: signout,
    viewAdminLogin: viewAdminLogin
};