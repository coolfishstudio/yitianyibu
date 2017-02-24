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


var getUserByEmail = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(email) {
        var getResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _model2.default.findOne({ email: email });

                    case 2:
                        getResult = _context.sent;
                        return _context.abrupt('return', getResult);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getUserByEmail(_x) {
        return _ref.apply(this, arguments);
    };
}();

var addUser = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var addResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _model2.default.create({
                            username: options.username || '',
                            password: options.password || '',
                            email: options.email || ''
                        });

                    case 2:
                        addResult = _context2.sent;
                        return _context2.abrupt('return', addResult);

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function addUser() {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = {
    addUser: addUser,
    getUserByEmail: getUserByEmail
};