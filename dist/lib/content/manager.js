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


var addContent = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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

    return function addContent() {
        return _ref.apply(this, arguments);
    };
}();
var getContentById = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(contentId) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _model2.default.findById(contentId);

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

    return function getContentById(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
var findContents = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var obj, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        obj = Object.assign({ removed: false }, options);
                        _context3.next = 3;
                        return _model2.default.find(obj).sort({ updatedAt: -1 });

                    case 3:
                        result = _context3.sent;
                        return _context3.abrupt('return', result);

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function findContents() {
        return _ref3.apply(this, arguments);
    };
}();
var updateContentById = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(contentId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var analyse, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _model2.default.findById(contentId);

                    case 2:
                        analyse = _context4.sent;

                        if (analyse) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt('return', null);

                    case 5:

                        analyse.title = options.title;
                        analyse.html = options.html;
                        analyse.images = options.images;
                        analyse.markdown = options.markdown;
                        analyse.status = options.status;
                        analyse.featured = options.featured;

                        if (options.tag) {
                            analyse.tag = [options.tag];
                        }
                        if (options.category) {
                            analyse.category = [options.category];
                        }
                        if (options.createdAt) {
                            analyse.createdAt = new Date(options.createdAt).getTime();
                        }
                        analyse.updatedAt = Date.now();
                        _context4.next = 17;
                        return analyse.save();

                    case 17:
                        result = _context4.sent;
                        return _context4.abrupt('return', result);

                    case 19:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function updateContentById(_x4) {
        return _ref4.apply(this, arguments);
    };
}();
var removeContentById = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(contentId) {
        var analyse, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _model2.default.findById(contentId);

                    case 2:
                        analyse = _context5.sent;

                        if (analyse) {
                            _context5.next = 5;
                            break;
                        }

                        return _context5.abrupt('return', null);

                    case 5:
                        analyse.removed = true;
                        analyse.updatedAt = Date.now();
                        _context5.next = 9;
                        return analyse.save();

                    case 9:
                        result = _context5.sent;
                        return _context5.abrupt('return', result);

                    case 11:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function removeContentById(_x6) {
        return _ref5.apply(this, arguments);
    };
}();
var countContent = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return _model2.default.count();

                    case 2:
                        result = _context6.sent;
                        return _context6.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function countContent() {
        return _ref6.apply(this, arguments);
    };
}();
var hitContentById = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(contentId) {
        var analyse, hits, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return _model2.default.findById(contentId);

                    case 2:
                        analyse = _context7.sent;

                        if (analyse) {
                            _context7.next = 5;
                            break;
                        }

                        return _context7.abrupt('return', null);

                    case 5:
                        hits = analyse.hits;

                        analyse.hits = hits + 1;
                        _context7.next = 9;
                        return analyse.save();

                    case 9:
                        result = _context7.sent;
                        return _context7.abrupt('return', result);

                    case 11:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function hitContentById(_x7) {
        return _ref7.apply(this, arguments);
    };
}();
exports.default = {
    addContent: addContent,
    getContentById: getContentById,
    findContents: findContents,
    updateContentById: updateContentById,
    removeContentById: removeContentById,
    countContent: countContent,
    hitContentById: hitContentById
};