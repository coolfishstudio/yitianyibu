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
var viewAdminPage = function viewAdminPage(req, res) {
    (0, _log2.default)('message_controller').info('访问留言板后台');
    res.renderAdminPage('message');
};

exports.default = {
    viewPage: viewPage,
    viewAdminPage: viewAdminPage
};