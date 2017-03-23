'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('../content/manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../category/manager');

var _manager4 = _interopRequireDefault(_manager3);

var _manager5 = require('../tag/manager');

var _manager6 = _interopRequireDefault(_manager5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewListPage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var posts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('post_controller').info('贴子列表页');
                        _context.next = 3;
                        return _manager2.default.findContents();

                    case 3:
                        posts = _context.sent;

                        posts = posts.map(function (item) {
                            item.html = item.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ');
                            if (item.html.length > 100) {
                                item.html = item.html.substr(0, 100);
                                item.html += '...';
                            }
                            return item;
                        });
                        res.renderPage('post-list', { posts: posts });

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewListPage(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var viewPostPage = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var post, tags, category;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('post_controller').info('详情页');
                        _context2.next = 3;
                        return _manager2.default.getContentById(req.params.pid);

                    case 3:
                        post = _context2.sent;
                        tags = [];
                        category = null;

                        if (!post.tag[0]) {
                            _context2.next = 12;
                            break;
                        }

                        _context2.t0 = tags;
                        _context2.next = 10;
                        return _manager6.default.getTagById(post.tag[0]);

                    case 10:
                        _context2.t1 = _context2.sent;

                        _context2.t0.push.call(_context2.t0, _context2.t1);

                    case 12:
                        if (!post.category) {
                            _context2.next = 16;
                            break;
                        }

                        _context2.next = 15;
                        return _manager4.default.getCategoryById(post.category);

                    case 15:
                        category = _context2.sent;

                    case 16:
                        post.category = category.name;
                        post.tag = tags;
                        res.renderPage('post', { post: post });

                    case 19:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewPostPage(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = {
    viewListPage: viewListPage,
    viewPostPage: viewPostPage
};