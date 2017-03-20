'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _manager = require('../user/manager');

var _manager2 = _interopRequireDefault(_manager);

var _helper = require('../../util/helper');

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LocalStrategy = _passportLocal2.default.Strategy;

var login = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, callback) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _passport2.default.authenticate('local', function (error, user, info) {
                            if (error) {
                                error.code = 500;
                                return callback(error);
                            }
                            if (info) {
                                error.code = 400;
                                return callback(info);
                            }
                            req.logIn(user, function (err) {
                                if (err) {
                                    return callback(err);
                                }
                                req.session.cookie.maxAge = 604800000;
                                req.user = user;
                                callback();
                            });
                        })(req, res, callback);

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function login(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

_passport2.default.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    _manager2.default.getUserByEmail(email).then(function (user) {
        if (!user) {
            var err = new Error('查无此用户');
            err.status = 400;
            return done(err);
        }
        if ((0, _helper.getMD5)(password) !== user.password) {
            var _err = new Error('密码错误');
            _err.status = 400;
            return done(_err);
        }
        (0, _log2.default)('auth').info('\u8D26\u6237' + user.email + '\u5DF2\u6210\u529F\u767B\u5F55');
        user.password = null;
        return done(null, user);
    });
}));

_passport2.default.serializeUser(function (user, done) {
    done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
    done(null, user);
});

exports.default = {
    login: login
};