'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _helper = require('../../util/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var viewAdminPage = function viewAdminPage(req, res) {
    (0, _log2.default)('comment_controller').info('评论');
    res.renderAdminPage('comment');
};
var createComment = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var ip, name, email, content, createError, err, adds, result, _err;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ip = (0, _helper.getClientIp)(req);
                        name = (req.body.name || '').trim();
                        email = (req.body.email || '').trim();
                        content = (req.body.content || '').trim();
                        // 校验

                        createError = '';

                        if (content === '') {
                            createError = '内容不能为空';
                        }
                        // 校验结果

                        if (!createError) {
                            _context.next = 10;
                            break;
                        }

                        err = new Error(createError);

                        err.status = 400;
                        return _context.abrupt('return', next(err));

                    case 10:
                        if (name === '') {
                            adds = ip.split('.');

                            adds[adds.length - 1] = '*';
                            name = adds.join('.');
                        }
                        _context.next = 13;
                        return _manager2.default.addComment({
                            ip: ip,
                            name: name,
                            email: email,
                            content: content,
                            contentId: req.params.pid
                        });

                    case 13:
                        result = _context.sent;

                        if (result) {
                            _context.next = 18;
                            break;
                        }

                        _err = new Error('评论失败');

                        _err.status = 400;
                        return _context.abrupt('return', next(_err));

                    case 18:
                        if (req.params.pid === 'message') {
                            res.redirect('/' + req.params.pid);
                        } else {
                            res.redirect('/post/' + req.params.pid);
                        }

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createComment(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    viewAdminPage: viewAdminPage,
    createComment: createComment
};