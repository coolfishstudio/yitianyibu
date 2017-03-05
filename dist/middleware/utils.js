'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        res.renderPage = function (name, data) {
            if (!data) data = {};
            data.pageName = name;
            res.render('homepage/pages/' + name, data);
        };
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