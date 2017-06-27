'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('../comment/manager');

var _manager2 = _interopRequireDefault(_manager);

var _helper = require('../../util/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewPage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var ip, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('message_controller').info('访问留言板');

                        ip = (0, _helper.getClientIp)(req);
                        data = {};

                        data.clientIp = ip;
                        /* eslint-disable */
                        data._id = 'message';
                        /* eslint-enable */
                        _context.next = 7;
                        return _manager2.default.findCommentsByContentId('message');

                    case 7:
                        data.messages = _context.sent;

                        res.renderPage('message', { data: data });

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewPage(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var viewAdminPage = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('message_controller').info('删除留言页面');
                        _context2.next = 3;
                        return _manager2.default.findCommentsByContentId('message');

                    case 3:
                        result = _context2.sent;

                        res.renderAdminPage('message/index', { result: result });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewAdminPage(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var viewAdminRemoveMessage = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        (0, _log2.default)('message_controller').info('访问留言板后台');
                        _context3.next = 3;
                        return _manager2.default.getCommentById(req.params.messageId);

                    case 3:
                        result = _context3.sent;

                        res.renderAdminPage('message/remove', { result: result });

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function viewAdminRemoveMessage(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
var removeMessage = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        var result, err;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        (0, _log2.default)('message_controller').info('删除留言');
                        _context4.next = 3;
                        return _manager2.default.removeCommentById(req.params.messageId);

                    case 3:
                        result = _context4.sent;

                        if (result) {
                            _context4.next = 8;
                            break;
                        }

                        err = new Error('删除失败');

                        err.status = 400;
                        return _context4.abrupt('return', next(err));

                    case 8:
                        res.redirect('/admin/message');

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function removeMessage(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

exports.default = {
    viewPage: viewPage,
    viewAdminPage: viewAdminPage,
    viewAdminRemoveMessage: viewAdminRemoveMessage,
    removeMessage: removeMessage
};