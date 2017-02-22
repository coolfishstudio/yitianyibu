'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewPage = function viewPage(req, res) {
    (0, _log2.default)('router').info('访问留言板');
    res.renderPage('message');
};
var viewAdminPage = function viewAdminPage(req, res) {
    (0, _log2.default)('router').info('访问留言板后台');
    res.renderAdminPage('message');
};

exports.default = {
    viewPage: viewPage,
    viewAdminPage: viewAdminPage
};