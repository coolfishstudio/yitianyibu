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


var addComment = function () {
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

    return function addComment(_x) {
        return _ref.apply(this, arguments);
    };
}();
var findCommentsByContentId = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(contentId) {
        var obj, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        obj = Object.assign({ removed: false }, { contentId: contentId });
                        _context2.next = 3;
                        return _model2.default.find(obj).sort({ createdAt: -1 });

                    case 3:
                        result = _context2.sent;
                        return _context2.abrupt('return', result);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function findCommentsByContentId(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
var removeCommentById = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(commentId) {
        var analyse, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _model2.default.findById(commentId);

                    case 2:
                        analyse = _context3.sent;

                        if (analyse) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt('return', null);

                    case 5:
                        analyse.removed = true;
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

    return function removeCommentById(_x3) {
        return _ref3.apply(this, arguments);
    };
}();
var countCommentByContentId = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(contentId) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _model2.default.count({ removed: false, contentId: contentId });

                    case 2:
                        result = _context4.sent;
                        return _context4.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function countCommentByContentId(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

exports.default = {
    addComment: addComment,
    findCommentsByContentId: findCommentsByContentId,
    removeCommentById: removeCommentById,
    countCommentByContentId: countCommentByContentId
};