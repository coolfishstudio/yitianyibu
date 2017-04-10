'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('../content/manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../comment/manager');

var _manager4 = _interopRequireDefault(_manager3);

var _manager5 = require('../category/manager');

var _manager6 = _interopRequireDefault(_manager5);

var _manager7 = require('../tag/manager');

var _manager8 = _interopRequireDefault(_manager7);

var _helper = require('../../util/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var limit = 10;

var viewListPage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var currentPage, results, promises, posts, countPage;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('post_controller').info('贴子列表页');
                        currentPage = 1;

                        try {
                            currentPage = parseInt(Number(req.query.p), 10) || 1;
                        } catch (err) {
                            currentPage = 1;
                        }
                        _context2.next = 5;
                        return _manager2.default.findContents({}, { limit: limit, skip: currentPage });

                    case 5:
                        results = _context2.sent;
                        promises = results.map(function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(item) {
                                var category;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                item.html = item.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ');
                                                if (item.html.length > 100) {
                                                    item.html = item.html.substr(0, 100);
                                                    item.html += '...';
                                                }
                                                /* eslint-disable */
                                                _context.next = 4;
                                                return _manager4.default.countCommentByContentId(item._id);

                                            case 4:
                                                item.commentsCount = _context.sent;
                                                category = {};

                                                if (!item.category) {
                                                    _context.next = 16;
                                                    break;
                                                }

                                                _context.prev = 7;
                                                _context.next = 10;
                                                return _manager6.default.getCategoryById(item.category);

                                            case 10:
                                                category = _context.sent;
                                                _context.next = 16;
                                                break;

                                            case 13:
                                                _context.prev = 13;
                                                _context.t0 = _context['catch'](7);

                                                category = {};

                                            case 16:
                                                return _context.abrupt('return', {
                                                    /* eslint-disable */
                                                    _id: item._id,
                                                    /* eslint-enable */
                                                    createdAt: item.createdAt,
                                                    hits: item.hits,
                                                    images: item.images,
                                                    html: item.html,
                                                    title: item.title,
                                                    comments: item.commentsCount,
                                                    categoryId: item.category,
                                                    category: category.name || '',
                                                    categoryPathname: category.pathname || ''
                                                });

                                            case 17:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined, [[7, 13]]);
                            }));

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }());
                        _context2.next = 9;
                        return Promise.all(promises);

                    case 9:
                        posts = _context2.sent;
                        _context2.t0 = Math;
                        _context2.next = 13;
                        return _manager2.default.countContent();

                    case 13:
                        _context2.t1 = _context2.sent;
                        _context2.t2 = limit;
                        _context2.t3 = _context2.t1 / _context2.t2;
                        countPage = _context2.t0.ceil.call(_context2.t0, _context2.t3);

                        res.renderPage('post-list', { posts: posts, countPage: countPage, currentPage: currentPage });

                    case 18:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewListPage(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var viewPostPage = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var post, tags, category, ip, contentNear;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        (0, _log2.default)('post_controller').info('详情页');
                        _context3.next = 3;
                        return _manager2.default.hitContentById(req.params.pid);

                    case 3:
                        _context3.next = 5;
                        return _manager2.default.getContentById(req.params.pid);

                    case 5:
                        post = _context3.sent;
                        tags = [];
                        category = null;

                        if (!post.tag[0]) {
                            _context3.next = 14;
                            break;
                        }

                        _context3.t0 = tags;
                        _context3.next = 12;
                        return _manager8.default.getTagById(post.tag[0]);

                    case 12:
                        _context3.t1 = _context3.sent;

                        _context3.t0.push.call(_context3.t0, _context3.t1);

                    case 14:
                        if (!post.category) {
                            _context3.next = 18;
                            break;
                        }

                        _context3.next = 17;
                        return _manager6.default.getCategoryById(post.category);

                    case 17:
                        category = _context3.sent;

                    case 18:
                        post.categoryId = post.category;
                        post.category = category.name;
                        post.categoryPathname = category.pathname || '';
                        post.tag = tags;
                        ip = (0, _helper.getClientIp)(req);

                        post.clientIp = ip;
                        _context3.next = 26;
                        return _manager4.default.findCommentsByContentId(req.params.pid);

                    case 26:
                        post.comments = _context3.sent;
                        _context3.next = 29;
                        return _manager4.default.countCommentByContentId(req.params.pid);

                    case 29:
                        post.commentsCount = _context3.sent;
                        _context3.next = 32;
                        return _manager2.default.getContentNear(post.createdAt);

                    case 32:
                        contentNear = _context3.sent;

                        post.prev = null;
                        post.next = null;
                        if (contentNear.prev) {
                            post.prev = {
                                /* eslint-disable */
                                _id: contentNear.prev._id,
                                /* eslint-enable */
                                title: contentNear.prev.title
                            };
                        }
                        if (contentNear.next) {
                            post.next = {
                                /* eslint-disable */
                                _id: contentNear.next._id,
                                /* eslint-enable */
                                title: contentNear.next.title
                            };
                        }
                        res.renderPage('post', { post: post });

                    case 38:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function viewPostPage(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();
var viewPostSharePage = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var post;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _manager2.default.getContentById(req.params.pid);

                    case 2:
                        post = _context4.sent;

                        post.html = post.html.replace(/<\/?.+?>/g, '').replace(/\r\n/g, ' ').replace(/\n/g, ' ');
                        if (post.html.length > 100) {
                            post.html = post.html.substr(0, 100);
                            post.html += '...';
                        }
                        _context4.next = 7;
                        return _manager6.default.getCategoryById(post.category);

                    case 7:
                        _context4.t0 = _context4.sent.name;

                        if (_context4.t0) {
                            _context4.next = 10;
                            break;
                        }

                        _context4.t0 = '其他';

                    case 10:
                        post.categoryName = _context4.t0;

                        /* eslint-disable */
                        post.shareUrl = req.get('host') + '/post/' + post._id;
                        /* eslint-enable */
                        res.renderPage('share', { post: post });

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function viewPostSharePage(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();
var getQrImage = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
        var url;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        url = req.query.url ? req.query.url : req.get('referrer');

                        (0, _helper.qrHelper)(url, function (error, qrImg) {
                            qrImg.pipe(res);
                        });

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function getQrImage(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

exports.default = {
    viewListPage: viewListPage,
    viewPostPage: viewPostPage,
    viewPostSharePage: viewPostSharePage,
    getQrImage: getQrImage
};