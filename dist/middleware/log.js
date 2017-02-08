'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    LOG_LEVEL = _process$env.LOG_LEVEL,
    NODE_ENV = _process$env.NODE_ENV;


var level = LOG_LEVEL || (NODE_ENV !== 'production' ? 'DEBUG' : 'INFO');

_log4js2.default.configure({
    appenders: [{
        type: 'console'
    }],
    levels: {
        console: level
    }
});

exports.default = function (type) {
    return _log4js2.default.getLogger(type);
};