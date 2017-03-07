'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewAdminSetting = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('setting_controller').info('设置');
                        _context.next = 3;
                        return _manager2.default.getSetting();

                    case 3:
                        result = _context.sent;

                        res.renderAdminPage('setting/index', { result: result });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewAdminSetting(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var viewAdminUpdateSetting = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('setting_controller').info('修改设置');
                        _context2.next = 3;
                        return _manager2.default.getSetting();

                    case 3:
                        result = _context2.sent;

                        res.renderAdminPage('setting/update', { result: result });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewAdminUpdateSetting(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var updateSetting = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
        var slogan, result, err;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        (0, _log2.default)('setting_controller').info('修改配置');
                        slogan = req.body.slogan || '';

                        if (slogan === '') {
                            slogan = [];
                        } else {
                            slogan = slogan.split('｜');
                        }
                        _context3.next = 5;
                        return _manager2.default.updateSetting({ slogan: slogan });

                    case 5:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 10;
                            break;
                        }

                        err = new Error('修改失败');

                        err.status = 400;
                        return _context3.abrupt('return', next(err));

                    case 10:
                        res.redirect('/admin/setting');

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function updateSetting(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

var initSetting = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        (0, _log2.default)('setting_controller').info('检测配置');
                        _context4.next = 3;
                        return _manager2.default.getSetting();

                    case 3:
                        result = _context4.sent;

                        if (result) {
                            _context4.next = 9;
                            break;
                        }

                        (0, _log2.default)('setting_controller').info('初始化配置');
                        _context4.next = 8;
                        return _manager2.default.addSetting();

                    case 8:
                        result = _context4.sent;

                    case 9:
                        return _context4.abrupt('return', result);

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function initSetting() {
        return _ref4.apply(this, arguments);
    };
}();

var createSetting = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        (0, _log2.default)('setting_controller').info('创建配置');
                        _context5.next = 3;
                        return initSetting();

                    case 3:
                        res.redirect('/admin/setting');

                    case 4:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function createSetting(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

var getSetting = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        (0, _log2.default)('setting_controller').info('获取设置');
                        _context6.next = 3;
                        return _manager2.default.getSetting();

                    case 3:
                        result = _context6.sent;
                        return _context6.abrupt('return', result);

                    case 5:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function getSetting() {
        return _ref6.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminSetting: viewAdminSetting,
    viewAdminUpdateSetting: viewAdminUpdateSetting,
    updateSetting: updateSetting,
    initSetting: initSetting,
    createSetting: createSetting,
    getSetting: getSetting
};