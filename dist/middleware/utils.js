'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _viewLocals = require('./viewLocals');

var _viewLocals2 = _interopRequireDefault(_viewLocals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    return function (req, res, next) {
        (0, _log2.default)('utils').info('加载工具方法');
        // admin
        res.renderAdminPage = function (name, data) {
            if (!data) data = {};
            data.pageName = name;
            res.render('admin/pages/' + name, data);
        };
        // homepage
        res.renderPage = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name, data) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!data) data = {};
                                data.pageName = name;
                                // 加载公共内容
                                _context.next = 4;
                                return _viewLocals2.default.getViewLocals();

                            case 4:
                                result = _context.sent;

                                // 公告
                                res.locals.slogan = result.slogan;
                                res.render('homepage/pages/' + name, data);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }();
        res.locals.viewHelper = {
            /* eslint-disable */
            // 时间格式化
            dateFormat: function dateFormat(date, format) {
                var o = {
                    'M+': date.getMonth() + 1, // 月份
                    'd+': date.getDate(), // 日
                    'h+': date.getHours(), // 小时
                    'm+': date.getMinutes(), // 分
                    's+': date.getSeconds(), // 秒
                    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                    'S': date.getMilliseconds() // 毫秒
                };
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                    }
                }
                return format;
            },
            getNodeEnv: function getNodeEnv() {
                return process.env.NODE_ENV;
            }
            /* eslint-enable */
        };
        next();
    };
};