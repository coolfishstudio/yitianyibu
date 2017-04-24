'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _manager = require('../lib/setting/manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../lib/content/manager');

var _manager4 = _interopRequireDefault(_manager3);

var _manager5 = require('../lib/app/manager');

var _manager6 = _interopRequireDefault(_manager5);

var _manager7 = require('../lib/comment/manager');

var _manager8 = _interopRequireDefault(_manager7);

var _manager9 = require('../lib/stat/manager');

var _manager10 = _interopRequireDefault(_manager9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getViewLocals = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
        var resultSetting, slogan, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _manager2.default.getSetting();

                    case 2:
                        resultSetting = _context.sent;
                        slogan = resultSetting ? resultSetting.slogan : [''];
                        url = (req.originalUrl || '/').replace(/\?.+$/, '');
                        _context.t0 = slogan[Math.floor(Math.random() * slogan.length)];
                        _context.next = 8;
                        return _manager4.default.countContent();

                    case 8:
                        _context.t1 = _context.sent;
                        _context.next = 11;
                        return _manager6.default.countApp();

                    case 11:
                        _context.t2 = _context.sent;
                        _context.next = 14;
                        return _manager8.default.countCommentByContentId('message');

                    case 14:
                        _context.t3 = _context.sent;
                        _context.t4 = {
                            content: _context.t1,
                            app: _context.t2,
                            message: _context.t3
                        };
                        _context.next = 18;
                        return _manager10.default.countStatInToday();

                    case 18:
                        _context.t5 = _context.sent;
                        _context.t6 = {
                            uv: _context.t5
                        };
                        _context.t7 = url;
                        return _context.abrupt('return', {
                            slogan: _context.t0,
                            count: _context.t4,
                            stat: _context.t6,
                            url: _context.t7
                        });

                    case 22:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getViewLocals(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    getViewLocals: getViewLocals
};