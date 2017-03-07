'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _helper = require('../../util/helper');

var _helper2 = _interopRequireDefault(_helper);

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _controller = require('../setting/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _process$env = process.env,
    ADMIN_USERNAME = _process$env.ADMIN_USERNAME,
    ADMIN_PASSWORD = _process$env.ADMIN_PASSWORD,
    ADMIN_EMAIL = _process$env.ADMIN_EMAIL;


var createUser = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var findResult, addResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (options.email) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return', Promise.resolve({
                            success: false,
                            message: '邮箱不能为空'
                        }));

                    case 2:
                        if (options.username) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return', Promise.resolve({
                            success: false,
                            message: '用户名不能为空'
                        }));

                    case 4:
                        if (options.password) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', Promise.resolve({
                            success: false,
                            message: '密码不能为空'
                        }));

                    case 6:
                        _context.next = 8;
                        return _manager2.default.getUserByEmail(options.email);

                    case 8:
                        findResult = _context.sent;

                        if (!findResult) {
                            _context.next = 11;
                            break;
                        }

                        return _context.abrupt('return', Promise.resolve({
                            success: false,
                            message: '邮箱已注册'
                        }));

                    case 11:
                        options.password = _helper2.default.getMD5(options.password);
                        _context.next = 14;
                        return _manager2.default.addUser(options);

                    case 14:
                        addResult = _context.sent;
                        return _context.abrupt('return', addResult);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createUser() {
        return _ref.apply(this, arguments);
    };
}();

var initUser = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var options, findResult, initResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('user_controller').info('检测管理员账户是否存在');
                        options = {
                            username: ADMIN_USERNAME,
                            password: ADMIN_PASSWORD,
                            email: ADMIN_EMAIL
                        };
                        _context2.next = 4;
                        return _manager2.default.getUserByEmail(options.email);

                    case 4:
                        findResult = _context2.sent;

                        if (!findResult) {
                            _context2.next = 8;
                            break;
                        }

                        (0, _log2.default)('user_controller').info('管理员账户已存在');
                        return _context2.abrupt('return', null);

                    case 8:
                        (0, _log2.default)('user_controller').info('管理员账户不存在, 开始创建管理员');
                        options.password = _helper2.default.getMD5(options.password);
                        _context2.next = 12;
                        return _manager2.default.addUser(options);

                    case 12:
                        initResult = _context2.sent;

                        if (!initResult) {
                            _context2.next = 19;
                            break;
                        }

                        (0, _log2.default)('user_controller').info('创建管理员成功');
                        _context2.next = 17;
                        return _controller2.default.initSetting();

                    case 17:
                        _context2.next = 20;
                        break;

                    case 19:
                        (0, _log2.default)('user_controller').info('创建管理员失败');

                    case 20:
                        return _context2.abrupt('return', null);

                    case 21:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function initUser() {
        return _ref2.apply(this, arguments);
    };
}();

var getUserByEmail = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(email) {
        var findResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _manager2.default.getUserByEmail(email);

                    case 2:
                        findResult = _context3.sent;
                        return _context3.abrupt('return', findResult);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getUserByEmail(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = {
    initUser: initUser,
    createUser: createUser,
    getUserByEmail: getUserByEmail
};