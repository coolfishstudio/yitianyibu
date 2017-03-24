'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../file/manager');

var _manager4 = _interopRequireDefault(_manager3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewAdminApp = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('app_controller').info('应用');
                        _context.next = 3;
                        return _manager2.default.findApps();

                    case 3:
                        result = _context.sent;

                        res.renderAdminPage('app/list', { result: result });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewAdminApp(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var viewAdminCreateApp = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('app_controller').info('创建应用');
                        res.renderAdminPage('app/create');

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewAdminCreateApp(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var createApp = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
        var imageResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _manager4.default.uploadImage(req, res);

                    case 3:
                        imageResult = _context3.sent;

                        /* eslint-disable */
                        imageResult.createdByID = req.user._id;
                        /* eslint-enable */
                        _context3.next = 7;
                        return _manager2.default.addApp(imageResult);

                    case 7:
                        res.redirect('/admin/app');
                        _context3.next = 14;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](0);

                        (0, _log2.default)('app_controller').error(_context3.t0);
                        return _context3.abrupt('return', next(_context3.t0));

                    case 14:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 10]]);
    }));

    return function createApp(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

var topApp = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _manager2.default.updateAppById(req.params.appId, { isTop: true });

                    case 2:
                        res.redirect('/admin/app');

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function topApp(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();
var untopApp = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _manager2.default.updateAppById(req.params.appId, { isTop: false });

                    case 2:
                        res.redirect('/admin/app');

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function untopApp(_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();
var viewAdminUpdateApp = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        (0, _log2.default)('app_controller').info('修改应用');
                        _context6.next = 3;
                        return _manager2.default.getAppById(req.params.appId);

                    case 3:
                        result = _context6.sent;

                        res.renderAdminPage('app/update', { result: result });

                    case 5:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function viewAdminUpdateApp(_x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();
var viewAdminRemoveApp = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        (0, _log2.default)('app_controller').info('删除应用');
                        _context7.next = 3;
                        return _manager2.default.getAppById(req.params.appId);

                    case 3:
                        result = _context7.sent;

                        res.renderAdminPage('app/remove', { result: result });

                    case 5:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function viewAdminRemoveApp(_x14, _x15) {
        return _ref7.apply(this, arguments);
    };
}();

var updateApp = function () {
    var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res, next) {
        var title, name, url, desc, type, createError, err, option, result, _err;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        (0, _log2.default)('app_controller').info('修改应用');
                        title = (req.body.title || '').trim();
                        name = (req.body.name || '').trim();
                        url = (req.body.url || '').trim();
                        desc = (req.body.desc || '').trim();
                        type = (req.body.type || '0').trim();
                        // 校验

                        createError = '';

                        if (title === '') {
                            createError = '标题不能为空';
                        } else if (name === '') {
                            createError = '名称不能为空';
                        } else if (url === '') {
                            createError = '链接不能为空';
                        }
                        // 校验结果

                        if (!createError) {
                            _context8.next = 12;
                            break;
                        }

                        err = new Error(createError);

                        err.status = 400;
                        return _context8.abrupt('return', next(err));

                    case 12:
                        option = {
                            title: title,
                            name: name,
                            url: url,
                            desc: desc,
                            type: type
                        };
                        _context8.next = 15;
                        return _manager2.default.updateAppById(req.params.appId, option);

                    case 15:
                        result = _context8.sent;

                        if (result) {
                            _context8.next = 20;
                            break;
                        }

                        _err = new Error('修改失败');

                        _err.status = 400;
                        return _context8.abrupt('return', next(_err));

                    case 20:
                        res.redirect('/admin/app');

                    case 21:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function updateApp(_x16, _x17, _x18) {
        return _ref8.apply(this, arguments);
    };
}();
var removeApp = function () {
    var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(req, res, next) {
        var result, err;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        (0, _log2.default)('content_controller').info('删除应用');
                        _context9.next = 3;
                        return _manager2.default.removeAppById(req.params.appId);

                    case 3:
                        result = _context9.sent;

                        if (result) {
                            _context9.next = 8;
                            break;
                        }

                        err = new Error('删除失败');

                        err.status = 400;
                        return _context9.abrupt('return', next(err));

                    case 8:
                        res.redirect('/admin/app');

                    case 9:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined);
    }));

    return function removeApp(_x19, _x20, _x21) {
        return _ref9.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminApp: viewAdminApp,
    viewAdminCreateApp: viewAdminCreateApp,
    createApp: createApp,
    topApp: topApp,
    untopApp: untopApp,
    viewAdminRemoveApp: viewAdminRemoveApp,
    viewAdminUpdateApp: viewAdminUpdateApp,
    updateApp: updateApp,
    removeApp: removeApp
};