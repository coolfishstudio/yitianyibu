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


var addSetting = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _model2.default.create({});

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

    return function addSetting() {
        return _ref.apply(this, arguments);
    };
}();
var getSetting = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _model2.default.findOne({});

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

    return function getSetting() {
        return _ref2.apply(this, arguments);
    };
}();
var updateSetting = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var analyse, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _model2.default.findOne({});

                    case 2:
                        analyse = _context3.sent;

                        if (analyse) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt('return', null);

                    case 5:
                        analyse.slogan = options.slogan;
                        analyse.updatedAt = Date.now();
                        _context3.next = 9;
                        return analyse.save();

                    case 9:
                        result = _context3.sent;
                        return _context3.abrupt('return', result);

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function updateSetting() {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = {
    addSetting: addSetting,
    getSetting: getSetting,
    updateSetting: updateSetting
};