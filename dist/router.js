'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _router = require('./lib/admin/router');

var _router2 = _interopRequireDefault(_router);

var _router3 = require('./lib/auth/router');

var _router4 = _interopRequireDefault(_router3);

var _router5 = require('./lib/message/router');

var _router6 = _interopRequireDefault(_router5);

var _router7 = require('./lib/about/router');

var _router8 = _interopRequireDefault(_router7);

var _router9 = require('./lib/labs/router');

var _router10 = _interopRequireDefault(_router9);

var _router11 = require('./lib/post/router');

var _router12 = _interopRequireDefault(_router11);

var _router13 = require('./lib/homepage/router');

var _router14 = _interopRequireDefault(_router13);

var _router15 = require('./lib/category/router');

var _router16 = _interopRequireDefault(_router15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/ping', function (req, res) {
    res.end('OK');
});

router.use(_router14.default); // 未完成
router.get('/', _router12.default);
router.use('/post', _router12.default); // 帖子详情页、帖子列表页
router.use('/labs', _router10.default); // 实验室
router.use('/about', _router8.default); // 关于
router.use('/message', _router6.default); // 留言
router.use('/category', _router16.default); // 分类
/* 后台管理 */
router.use('/admin/auth', _router4.default);
router.use('/admin', _router2.default);

exports.default = router;