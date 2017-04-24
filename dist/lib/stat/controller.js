'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _helper = require('../../util/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewAdminPage = function viewAdminPage(req, res) {
    (0, _log2.default)('stat_controller').info('统计');
    res.renderAdminPage('stat');
};

// 记录数据
var recordStat = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var ip, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ip = (0, _helper.getClientIp)(req);
                        url = req.query.u;
                        _context.next = 4;
                        return _manager2.default.addStat({ ip: ip, url: url });

                    case 4:
                        res.send('ok');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function recordStat(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminPage: viewAdminPage,
    recordStat: recordStat
};