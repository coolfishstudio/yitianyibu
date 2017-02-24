'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewAdminPage = function viewAdminPage(req, res) {
    (0, _log2.default)('admin_controller').info('管理首页');
    res.renderAdminPage('index');
};

exports.default = {
    viewAdminPage: viewAdminPage
};