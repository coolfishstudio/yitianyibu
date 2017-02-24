'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('../../middleware/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewPage = function viewPage(req, res) {
    (0, _log2.default)('about_controller').info('关于我');
    res.renderPage('about');
};

exports.default = {
    viewPage: viewPage
};