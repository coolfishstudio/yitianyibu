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
        next();
    };
};