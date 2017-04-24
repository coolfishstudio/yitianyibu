'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable */

/* eslint-enable */


var addStat = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _model2.default.create(Object.assign({}, options));

                    case 2:
                        result = _context.sent;
                        return _context.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addStat(_x) {
        return _ref.apply(this, arguments);
    };
}();
var findStatsByOptions = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(options) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _model2.default.find(options).sort({ createdAt: -1 });

                    case 2:
                        result = _context2.sent;
                        return _context2.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function findStatsByOptions(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
var countStatByOptions = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(options) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _model2.default.count({ options: options });

                    case 2:
                        result = _context3.sent;
                        return _context3.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function countStatByOptions(_x3) {
        return _ref3.apply(this, arguments);
    };
}();
// 获取今天的pv
var countStatInToday = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var day, time, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        day = new Date();
                        time = new Date([day.getFullYear(), day.getMonth() + 1, day.getDate()].join('-')).getTime();
                        _context4.next = 4;
                        return _model2.default.count({ createdAt: { $gte: time, $lte: time + 86400000 } });

                    case 4:
                        result = _context4.sent;
                        return _context4.abrupt('return', result);

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function countStatInToday() {
        return _ref4.apply(this, arguments);
    };
}();

exports.default = {
    addStat: addStat,
    findStatsByOptions: findStatsByOptions,
    countStatByOptions: countStatByOptions,
    countStatInToday: countStatInToday
};