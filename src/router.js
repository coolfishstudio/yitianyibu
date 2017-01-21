var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.renderPage('index', { title: '一天一步网', message: '模版测试' });
});

module.exports = router;
