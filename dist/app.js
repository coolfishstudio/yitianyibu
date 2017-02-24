'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _utils = require('./middleware/utils');

var _utils2 = _interopRequireDefault(_utils);

var _error = require('./middleware/error');

var _error2 = _interopRequireDefault(_error);

var _log = require('./middleware/log');

var _log2 = _interopRequireDefault(_log);

var _db = require('./util/db');

var _controller = require('./lib/user/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    PORT = _process$env.PORT,
    NODE_ENV = _process$env.NODE_ENV;

var app = (0, _express2.default)();
var port = PORT || 8080;

app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');
app.use(_express2.default.static(__dirname + '/../public'));
app.get('/favicon.ico', function (req, res) {
    res.status(204).end();
});

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use((0, _utils2.default)());

app.use((0, _expressSession2.default)({
    secret: 'coolfishstudio',
    name: 'yitianyibu',
    cookie: { maxAge: 80000 },
    resave: false,
    saveUninitialized: true
}));
// 登录认证
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use(_router2.default);
app.use((0, _error2.default)());

// 启动服务
// const server = app.listen(port, () => {
//     const serverPort = server.address().port
//     log('app').info(`服务运行环境: ${NODE_ENV}`)
//     log('app').info(`端口号为: ${serverPort}`)
//     log('app').info('服务已启动')
// })
(0, _db.onReady)(function () {
    var server = app.listen(port, function () {
        var serverPort = server.address().port;
        (0, _log2.default)('app').info('\u670D\u52A1\u8FD0\u884C\u73AF\u5883: ' + NODE_ENV);
        (0, _log2.default)('app').info('\u7AEF\u53E3\u53F7\u4E3A: ' + serverPort);
        (0, _log2.default)('app').info('服务已启动');
        _controller2.default.initUser();
    });
});