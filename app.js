var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var router = require('./src/router');
var utilsMiddleware = require('./src/middleware/utils');

// 设置模版文件路径
app.set('views', path.join(__dirname, 'views'));
// 设置模版引擎
app.set('view engine', 'pug');
// 中间件
app.use(utilsMiddleware());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 挂载路由
app.use(router);
// 捕获错误
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Error');
});
// 启动服务
var server = app.listen(9017, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express app listening at http://%s:%s', host, port);
});
