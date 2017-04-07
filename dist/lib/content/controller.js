'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _helper = require('../../util/helper');

var _manager = require('../file/manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('../category/manager');

var _manager4 = _interopRequireDefault(_manager3);

var _manager5 = require('../tag/manager');

var _manager6 = _interopRequireDefault(_manager5);

var _manager7 = require('../content/manager');

var _manager8 = _interopRequireDefault(_manager7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewAdminContent = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _log2.default)('content_controller').info('内容列表');
                        _context.next = 3;
                        return _manager8.default.findContents();

                    case 3:
                        result = _context.sent;

                        res.renderAdminPage('content/list', { result: result });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function viewAdminContent(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var viewAdminCreateContent = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        (0, _log2.default)('content_controller').info('创建内容');
                        _context2.next = 3;
                        return _manager4.default.findCategorys();

                    case 3:
                        _context2.t0 = _context2.sent;
                        _context2.next = 6;
                        return _manager6.default.findTags();

                    case 6:
                        _context2.t1 = _context2.sent;
                        result = {
                            category: _context2.t0,
                            tag: _context2.t1
                        };

                        res.renderAdminPage('content/create', { result: result });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function viewAdminCreateContent(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
var uploadImage = function uploadImage(req, res, next) {
    var isFileLimit = false;
    req.busboy.on('file', function (fieldname, file, filename) {
        file.on('limit', function () {
            isFileLimit = true;
            res.json({
                success: false,
                msg: 'File size too large. Max is 1Mb'
            });
        });
        _manager2.default.uploadContentImage(file, { filename: filename }, function (err, result) {
            if (err) {
                return next(err);
            }
            if (isFileLimit) {
                return false;
            }
            res.json({
                success: true,
                url: result.url
            });
        });
    });
    req.pipe(req.busboy);
};
var createContent = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
        var title, content, category, tag, status, featured, time, hits, createError, err, html, reg, images, option, createdByID, result, _err;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        title = (req.body.title || '').trim();
                        content = (req.body.content || '').trim();
                        category = (req.body.category || '').trim();
                        tag = (req.body.tag || '').trim();
                        status = (req.body.status || 'published').trim();
                        featured = !!Number((req.body.featured || '1').trim());
                        time = req.body.time || '';
                        hits = req.body.hits || 1;
                        // 校验

                        createError = '';

                        if (title === '') {
                            createError = '标题不能为空';
                        } else if (content === '') {
                            createError = '内容不能为空';
                        }
                        // 校验结果

                        if (!createError) {
                            _context3.next = 14;
                            break;
                        }

                        err = new Error(createError);

                        err.status = 400;
                        return _context3.abrupt('return', next(err));

                    case 14:
                        html = '<div class="markdown-text">' + _helper.xss.process(_helper.md.render(content || '')) + '</div>';
                        reg = new RegExp('!\\[.*?\\]\\((.*?)\\)', 'g');
                        images = [];

                        content.replace(reg, function () {
                            images.push(RegExp.$1);
                            return RegExp.$1;
                        });
                        option = {
                            title: title,
                            html: html,
                            images: images,
                            markdown: content,
                            status: status,
                            featured: featured,
                            hits: hits
                        };

                        if (tag) {
                            option.tag = [tag];
                        }
                        if (category) {
                            option.category = category;
                        }
                        if (time) {
                            option.createdAt = new Date(time).getTime();
                        }
                        /* eslint-disable */
                        createdByID = req.user._id;
                        /* eslint-enable */

                        option.createdByID = createdByID;
                        _context3.next = 26;
                        return _manager8.default.addContent(option);

                    case 26:
                        result = _context3.sent;

                        if (result) {
                            _context3.next = 31;
                            break;
                        }

                        _err = new Error('创建失败');

                        _err.status = 400;
                        return _context3.abrupt('return', next(_err));

                    case 31:
                        res.redirect('/admin/content');

                    case 32:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function createContent(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();
var viewAdminUpdateContent = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        (0, _log2.default)('content_controller').info('修改内容');
                        _context4.next = 3;
                        return _manager4.default.findCategorys();

                    case 3:
                        _context4.t0 = _context4.sent;
                        _context4.next = 6;
                        return _manager6.default.findTags();

                    case 6:
                        _context4.t1 = _context4.sent;
                        _context4.next = 9;
                        return _manager8.default.getContentById(req.params.contentId);

                    case 9:
                        _context4.t2 = _context4.sent;
                        result = {
                            category: _context4.t0,
                            tag: _context4.t1,
                            content: _context4.t2
                        };

                        res.renderAdminPage('content/update', { result: result });

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function viewAdminUpdateContent(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

var viewAdminRemoveContent = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        (0, _log2.default)('content_controller').info('删除内容');
                        _context5.next = 3;
                        return _manager4.default.findCategorys();

                    case 3:
                        _context5.t0 = _context5.sent;
                        _context5.next = 6;
                        return _manager6.default.findTags();

                    case 6:
                        _context5.t1 = _context5.sent;
                        _context5.next = 9;
                        return _manager8.default.getContentById(req.params.contentId);

                    case 9:
                        _context5.t2 = _context5.sent;
                        result = {
                            category: _context5.t0,
                            tag: _context5.t1,
                            content: _context5.t2
                        };

                        res.renderAdminPage('content/remove', { result: result });

                    case 12:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function viewAdminRemoveContent(_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

var updateContent = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res, next) {
        var title, content, category, tag, status, featured, time, createError, err, html, reg, images, option, result, _err2;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        title = (req.body.title || '').trim();
                        content = (req.body.content || '').trim();
                        category = (req.body.category || '').trim();
                        tag = (req.body.tag || '').trim();
                        status = (req.body.status || 'published').trim();
                        featured = !!Number((req.body.featured || '1').trim());
                        time = req.body.time || '';
                        // 校验

                        createError = '';

                        if (title === '') {
                            createError = '标题不能为空';
                        } else if (content === '') {
                            createError = '内容不能为空';
                        }
                        // 校验结果

                        if (!createError) {
                            _context6.next = 13;
                            break;
                        }

                        err = new Error(createError);

                        err.status = 400;
                        return _context6.abrupt('return', next(err));

                    case 13:
                        html = '<div class="markdown-text">' + _helper.xss.process(_helper.md.render(content || '')) + '</div>';
                        reg = new RegExp('!\\[.*?\\]\\((.*?)\\)', 'img');
                        images = content.match(reg) || [];

                        images = images.map(function (item) {
                            return item.replace(/!\[.*\]\(/, '').replace(/\)/, '');
                        });
                        option = {
                            title: title,
                            html: html,
                            images: images,
                            markdown: content,
                            status: status,
                            featured: featured
                        };

                        if (tag) {
                            option.tag = [tag];
                        }
                        if (category) {
                            option.category = category;
                        }
                        if (time) {
                            option.createdAt = new Date(time).getTime();
                        }
                        _context6.next = 23;
                        return _manager8.default.updateContentById(req.params.contentId, option);

                    case 23:
                        result = _context6.sent;

                        if (result) {
                            _context6.next = 28;
                            break;
                        }

                        _err2 = new Error('修改失败');

                        _err2.status = 400;
                        return _context6.abrupt('return', next(_err2));

                    case 28:
                        res.redirect('/admin/content');

                    case 29:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function updateContent(_x12, _x13, _x14) {
        return _ref6.apply(this, arguments);
    };
}();
var removeContent = function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res, next) {
        var result, err;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        (0, _log2.default)('content_controller').info('删除内容');
                        _context7.next = 3;
                        return _manager8.default.removeContentById(req.params.contentId);

                    case 3:
                        result = _context7.sent;

                        if (result) {
                            _context7.next = 8;
                            break;
                        }

                        err = new Error('删除失败');

                        err.status = 400;
                        return _context7.abrupt('return', next(err));

                    case 8:
                        res.redirect('/admin/content');

                    case 9:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function removeContent(_x15, _x16, _x17) {
        return _ref7.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminContent: viewAdminContent,
    viewAdminCreateContent: viewAdminCreateContent,
    uploadImage: uploadImage,
    createContent: createContent,
    viewAdminUpdateContent: viewAdminUpdateContent,
    updateContent: updateContent,
    viewAdminRemoveContent: viewAdminRemoveContent,
    removeContent: removeContent
};