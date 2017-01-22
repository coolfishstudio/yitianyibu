import express from 'express'

var app = express();
var bodyParser = require('body-parser');

var router = require('./router');
var utilsMiddleware = require('./middleware/utils');

// 设置模版文件路径
app.set('views', `${__dirname}/../views`);
// 设置模版引擎
app.set('view engine', 'pug');
// 中间件
app.use(utilsMiddleware());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));

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
