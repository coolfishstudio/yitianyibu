'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../content/manager');

var _manager4 = _interopRequireDefault(_manager3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var limit = 10;

var viewAdminCategory = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('类别');
                        _context.next = 3;
                        return _manager2.default.findCategorys();

                    case 3:
                        result = _context.sent;

                        res.renderAdminPage('category/list', { result: result });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewAdminCategory(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var viewAdminCreateCategory = function viewAdminCreateCategory(req, res) {
    (0, _log2.default)('category_controller').info('创建类别页面');
    res.renderAdminPage('category/create');
};
var viewAdminUpdateCategory = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('修改类别页面');
                        _context2.next = 3;
                        return _manager2.default.getCategoryById(req.params.categoryId);

                    case 3:
                        result = _context2.sent;

                        res.renderAdminPage('category/update', { result: result });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewAdminUpdateCategory(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var viewAdminRemoveCategory = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('删除类别页面');
                        _context3.next = 3;
                        return _manager2.default.getCategoryById(req.params.categoryId);

                    case 3:
                        result = _context3.sent;

                        res.renderAdminPage('category/remove', { result: result });

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function viewAdminRemoveCategory(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
var createCategory = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        var name, weight, desc, pathname, err, createdByID, result, _err;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('创建类别');
                        name = req.body.name || '';
                        weight = req.body.weight || '';
                        desc = req.body.desc || '';
                        pathname = (req.body.pathname || '').toLowerCase();

                        if (!(!name || !weight)) {
                            _context4.next = 9;
                            break;
                        }

                        err = new Error('参数不足');

                        err.status = 400;
                        return _context4.abrupt('return', next(err));

                    case 9:
                        /* eslint-disable */
                        createdByID = req.user._id;
                        /* eslint-enable */

                        _context4.next = 12;
                        return _manager2.default.addCategory({ name: name, weight: weight, createdByID: createdByID, desc: desc, pathname: pathname });

                    case 12:
                        result = _context4.sent;

                        if (result) {
                            _context4.next = 17;
                            break;
                        }

                        _err = new Error('创建失败');

                        _err.status = 400;
                        return _context4.abrupt('return', next(_err));

                    case 17:
                        res.redirect('/admin/category');

                    case 18:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function createCategory(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();
var updateCategory = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res, next) {
        var name, weight, desc, pathname, err, result, _err2;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('修改类别');
                        name = req.body.name || '';
                        weight = req.body.weight || '';
                        desc = req.body.desc || '';
                        pathname = (req.body.pathname || '').toLowerCase();

                        if (!(!name || !weight)) {
                            _context5.next = 9;
                            break;
                        }

                        err = new Error('参数不足');

                        err.status = 400;
                        return _context5.abrupt('return', next(err));

                    case 9:
                        _context5.next = 11;
                        return _manager2.default.updateCategoryById(req.params.categoryId, { name: name, weight: weight, desc: desc, pathname: pathname });

                    case 11:
                        result = _context5.sent;

                        if (result) {
                            _context5.next = 16;
                            break;
                        }

                        _err2 = new Error('修改失败');

                        _err2.status = 400;
                        return _context5.abrupt('return', next(_err2));

                    case 16:
                        res.redirect('/admin/category');

                    case 17:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function updateCategory(_x10, _x11, _x12) {
        return _ref5.apply(this, arguments);
    };
}();
var removeCategory = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res, next) {
        var result, err;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('删除类别');
                        _context6.next = 3;
                        return _manager2.default.removeCategoryById(req.params.categoryId);

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
                        res.redirect('/admin/category');

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function removeCategory(_x13, _x14, _x15) {
        return _ref6.apply(this, arguments);
    };
}();
var viewListPage = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res) {
        var results, promises, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('类别集合');
                        _context8.next = 3;
                        return _manager2.default.findCategorys();

                    case 3:
                        results = _context8.sent;
                        promises = results.map(function () {
                            var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(item) {
                                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                        switch (_context7.prev = _context7.next) {
                                            case 0:
                                                _context7.next = 2;
                                                return _manager4.default.countContentByCategory(item._id);

                                            case 2:
                                                item.postsCount = _context7.sent;
                                                return _context7.abrupt('return', item);

                                            case 4:
                                            case 'end':
                                                return _context7.stop();
                                        }
                                    }
                                }, _callee7, undefined);
                            }));

                            return function (_x18) {
                                return _ref8.apply(this, arguments);
                            };
                        }());
                        _context8.next = 7;
                        return Promise.all(promises);

                    case 7:
                        result = _context8.sent;


                        res.renderPage('categorys', { result: result });

                    case 9:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function viewListPage(_x16, _x17) {
        return _ref7.apply(this, arguments);
    };
}();
var viewCategoryPage = function () {
    var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res, next) {
        var result, currentPage, pathname, err, results, promises;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        (0, _log2.default)('category_controller').info('类别列表');
                        result = {};
                        currentPage = 1;

                        try {
                            currentPage = parseInt(Number(req.query.p), 10) || 1;
                        } catch (err) {
                            currentPage = 1;
                        }

                        if (!/^[0-9a-f]{24}/.test(req.params.categoryId)) {
                            _context10.next = 10;
                            break;
                        }

                        _context10.next = 7;
                        return _manager2.default.getCategoryById(req.params.categoryId);

                    case 7:
                        result.info = _context10.sent;
                        _context10.next = 14;
                        break;

                    case 10:
                        pathname = (req.params.categoryId || '').toLowerCase();
                        _context10.next = 13;
                        return _manager2.default.getCategoryByOptions({ pathname: pathname });

                    case 13:
                        result.info = _context10.sent;

                    case 14:
                        if (result.info) {
                            _context10.next = 18;
                            break;
                        }

                        err = new Error('Not Found');

                        err.status = 404;
                        return _context10.abrupt('return', next(err));

                    case 18:
                        _context10.next = 20;
                        return _manager4.default.findContents({ category: req.params.categoryId }, { limit: limit, skip: currentPage, createdAt: 1 });

                    case 20:
                        results = _context10.sent;
                        promises = results.map(function () {
                            var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(item) {
                                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                        switch (_context9.prev = _context9.next) {
                                            case 0:
                                                return _context9.abrupt('return', {
                                                    /* eslint-disable */
                                                    _id: item._id,
                                                    wordsCount: item.markdown.length,
                                                    createdAt: item.createdAt,
                                                    title: item.title
                                                    /* eslint-enable */
                                                });

                                            case 1:
                                            case 'end':
                                                return _context9.stop();
                                        }
                                    }
                                }, _callee9, undefined);
                            }));

                            return function (_x22) {
                                return _ref10.apply(this, arguments);
                            };
                        }());
                        _context10.next = 24;
                        return Promise.all(promises);

                    case 24:
                        result.list = _context10.sent;

                        result.currentPage = currentPage;
                        _context10.t0 = Math;
                        _context10.next = 29;
                        return _manager4.default.countContentByCategory(req.params.categoryId);

                    case 29:
                        _context10.t1 = _context10.sent;
                        _context10.t2 = limit;
                        _context10.t3 = _context10.t1 / _context10.t2;
                        result.countPage = _context10.t0.ceil.call(_context10.t0, _context10.t3);

                        res.renderPage('category-list', { result: result });

                    case 34:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, undefined);
    }));

    return function viewCategoryPage(_x19, _x20, _x21) {
        return _ref9.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminCategory: viewAdminCategory,
    viewAdminCreateCategory: viewAdminCreateCategory,
    viewAdminUpdateCategory: viewAdminUpdateCategory,
    viewAdminRemoveCategory: viewAdminRemoveCategory,
    createCategory: createCategory,
    updateCategory: updateCategory,
    removeCategory: removeCategory,
    viewListPage: viewListPage,
    viewCategoryPage: viewCategoryPage
};