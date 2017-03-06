'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewAdminTag = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('标签');
                        _context.next = 3;
                        return _manager2.default.findTags();

                    case 3:
                        result = _context.sent;

                        res.renderAdminPage('tag/list', { result: result });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewAdminTag(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var viewAdminCreateTag = function viewAdminCreateTag(req, res) {
    (0, _log2.default)('tag_controller').info('创建标签页面');
    res.renderAdminPage('tag/create');
};

var viewAdminUpdateTag = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('修改标签页面');
                        _context2.next = 3;
                        return _manager2.default.getTagById(req.params.tagId);

                    case 3:
                        result = _context2.sent;

                        res.renderAdminPage('tag/update', { result: result });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewAdminUpdateTag(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var viewAdminRemoveTag = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('删除标签页面');
                        _context3.next = 3;
                        return _manager2.default.getTagById(req.params.tagId);

                    case 3:
                        result = _context3.sent;

                        res.renderAdminPage('tag/remove', { result: result });

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function viewAdminRemoveTag(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var createTag = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        var name, weight, err, createdByID, result, _err;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('创建标签');
                        name = req.body.name || '';
                        weight = req.body.weight || '';

                        if (!(!name || !weight)) {
                            _context4.next = 7;
                            break;
                        }

                        err = new Error('参数不足');

                        err.status = 400;
                        return _context4.abrupt('return', next(err));

                    case 7:
                        /* eslint-disable */
                        createdByID = req.user._id;
                        /* eslint-enable */

                        _context4.next = 10;
                        return _manager2.default.addTag({ name: name, weight: weight, createdByID: createdByID });

                    case 10:
                        result = _context4.sent;

                        if (result) {
                            _context4.next = 15;
                            break;
                        }

                        _err = new Error('创建失败');

                        _err.status = 400;
                        return _context4.abrupt('return', next(_err));

                    case 15:
                        res.redirect('/admin/tag');

                    case 16:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function createTag(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

var updateTag = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
        var name, weight, err, result, _err2;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('修改标签');
                        name = req.body.name || '';
                        weight = req.body.weight || '';

                        if (!(!name || !weight)) {
                            _context5.next = 7;
                            break;
                        }

                        err = new Error('参数不足');

                        err.status = 400;
                        return _context5.abrupt('return', next(err));

                    case 7:
                        _context5.next = 9;
                        return _manager2.default.updateTagById(req.params.tagId, { name: name, weight: weight });

                    case 9:
                        result = _context5.sent;

                        if (result) {
                            _context5.next = 14;
                            break;
                        }

                        _err2 = new Error('修改失败');

                        _err2.status = 400;
                        return _context5.abrupt('return', next(_err2));

                    case 14:
                        res.redirect('/admin/tag');

                    case 15:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function updateTag(_x10, _x11, _x12) {
        return _ref5.apply(this, arguments);
    };
}();

var removeTag = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res, next) {
        var result, err;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('删除标签');
                        _context6.next = 3;
                        return _manager2.default.removeTagById(req.params.tagId);

                    case 3:
                        result = _context6.sent;

                        if (result) {
                            _context6.next = 8;
                            break;
                        }

                        err = new Error('删除失败');

                        err.status = 400;
                        return _context6.abrupt('return', next(err));

                    case 8:
                        res.redirect('/admin/tag');

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function removeTag(_x13, _x14, _x15) {
        return _ref6.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminTag: viewAdminTag,
    viewAdminCreateTag: viewAdminCreateTag,
    createTag: createTag,
    viewAdminUpdateTag: viewAdminUpdateTag,
    updateTag: updateTag,
    viewAdminRemoveTag: viewAdminRemoveTag,
    removeTag: removeTag
};