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

var viewAdminPage = function () {
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

    return function viewAdminPage(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var viewAdminCreatePage = function viewAdminCreatePage(req, res) {
    (0, _log2.default)('tag_controller').info('创建标签页面');
    res.renderAdminPage('tag/create');
};

var createTag = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
        var name, weight, err, createdByID, result, _err;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('tag_controller').info('创建标签');
                        name = req.body.name || '';
                        weight = req.body.weight || '';

                        if (!(!name || !weight)) {
                            _context2.next = 7;
                            break;
                        }

                        err = new Error('参数不足');

                        err.status = 400;
                        return _context2.abrupt('return', next(err));

                    case 7:
                        /* eslint-disable */
                        createdByID = req.user._id;
                        /* eslint-enable */

                        _context2.next = 10;
                        return _manager2.default.addTag({ name: name, weight: weight, createdByID: createdByID });

                    case 10:
                        result = _context2.sent;

                        if (result) {
                            _context2.next = 15;
                            break;
                        }

                        _err = new Error('创建失败');

                        _err.status = 400;
                        return _context2.abrupt('return', next(_err));

                    case 15:
                        res.redirect('/admin/tag');

                    case 16:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function createTag(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminPage: viewAdminPage,
    viewAdminCreatePage: viewAdminCreatePage,
    createTag: createTag
};