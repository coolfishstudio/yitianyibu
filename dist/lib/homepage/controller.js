'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewUnfinishedPage = function viewUnfinishedPage(req, res) {
    (0, _log2.default)('homepage_controller').info('未完成页面');
    res.renderPage('unfinished');
};

exports.default = {
    viewUnfinishedPage: viewUnfinishedPage
};