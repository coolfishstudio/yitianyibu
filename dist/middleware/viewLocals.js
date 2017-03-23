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

var _manager7 = require('../lib/category/manager');

var _manager8 = _interopRequireDefault(_manager7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getViewLocals = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var resultSetting, slogan;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _manager2.default.getSetting();

                    case 2:
                        resultSetting = _context.sent;
                        slogan = resultSetting ? resultSetting.slogan : [''];
                        _context.t0 = slogan[Math.floor(Math.random() * slogan.length)];
                        _context.next = 7;
                        return _manager4.default.countContent();

                    case 7:
                        _context.t1 = _context.sent;
                        _context.next = 10;
                        return _manager6.default.countApp();

                    case 10:
                        _context.t2 = _context.sent;
                        _context.next = 13;
                        return _manager8.default.countCategory();

                    case 13:
                        _context.t3 = _context.sent;
                        _context.t4 = {
                            content: _context.t1,
                            app: _context.t2,
                            category: _context.t3
                        };
                        return _context.abrupt('return', {
                            slogan: _context.t0,
                            count: _context.t4
                        });

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getViewLocals() {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    getViewLocals: getViewLocals
};