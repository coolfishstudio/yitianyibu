'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _log = require('./middleware/log');

var _log2 = _interopRequireDefault(_log);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/ping', function (req, res) {
    res.end('OK');
});

router.get('/', function (req, res) {
    (0, _log2.default)('router').info('访问首页');
    var applications = [{ name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' }, { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }, { name: '在线编辑器', title: '猿Coding', icon: 'app_06', url: 'http://www.yuancoding.com', desc: '在线编程、交流、学习网站' }];
    res.renderPage('index', { applications: applications });
});

router.use('/post', _router12.default); // 帖子详情页、帖子列表页
router.use('/labs', _router10.default); // 实验室
router.use('/about', _router8.default); // 关于
router.use('/message', _router6.default); // 留言
/* 后台管理 */
router.use('/admin/auth', _router4.default);
router.use('/admin', _router2.default);

exports.default = router;