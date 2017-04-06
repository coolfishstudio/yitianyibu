'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return [function (req, res) {
        // 404
        var err = new Error('Not Found');
        err.status = 404;
        (0, _log2.default)('error-404').error(err);
        res.status(err.status || 400).format({
            html: function html() {
                res.renderPage('error', {
                    errcode: 404,
                    message: 'Not Found'
                });
            },
            json: function json() {
                res.json({
                    errcode: err.status || 404,
                    message: 'Not Found'
                });
            }
        });
    }, function (err, req, res, next) {
        if (!err) return next();
        (0, _log2.default)('error-500').error(err);
        var message = err.message || '发生了一个很奇怪的错误...';
        res.status(err.status || 500).format({
            html: function html() {
                res.renderPage('error', {
                    errcode: err.status || 500,
                    message: message
                });
            },
            json: function json() {
                res.json({
                    errcode: err.status || 500,
                    message: message
                });
            }
        });
    }];
};