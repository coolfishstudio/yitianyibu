'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addTag = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var addResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _model2.default.create(Object.assign({}, options));

                    case 2:
                        addResult = _context.sent;
                        return _context.abrupt('return', Promise.resolve({
                            success: !!addResult,
                            message: '',
                            result: addResult || null
                        }));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addTag() {
        return _ref.apply(this, arguments);
    };
}();
var getTag = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(tagID) {
        var getResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _model2.default.findById(tagID);

                    case 2:
                        getResult = _context2.sent;
                        return _context2.abrupt('return', Promise.resolve({
                            success: !!getResult,
                            message: '',
                            result: getResult.tags || null
                        }));

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getTag(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
var findTag = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var findResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _model2.default.find(Object.assign({}, options));

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

    return function findTag() {
        return _ref3.apply(this, arguments);
    };
}();
exports.default = {
    addTag: addTag,
    getTag: getTag,
    findTag: findTag
};