'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _log = require('./middleware/log');

var _log2 = _interopRequireDefault(_log);

var _router = require('./lib/admin/router');

var _router2 = _interopRequireDefault(_router);

var _router3 = require('./lib/message/router');

var _router4 = _interopRequireDefault(_router3);

var _router5 = require('./lib/auth/router');

var _router6 = _interopRequireDefault(_router5);

var _auth = require('./middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/ping', function (req, res) {
    res.end('OK');
});

router.get('/', function (req, res) {
    (0, _log2.default)('router').info('访问首页');
    var applications = [{ name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' }, { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }];
    res.renderPage('index', { applications: applications });
});
// 列表页
router.get('/posts', function (req, res) {
    var applications = [{ name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' }, { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }];
    res.renderPage('post-list', { applications: applications });
});
// 帖子详情页
router.get('/post/:pid', function (req, res) {
    var applications = [{ name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' }, { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }];
    res.renderPage('post', { applications: applications });
});
// 实验室
router.get('/labs', function (req, res) {
    var applications = [{ name: 'SNOW.JS', title: '下雪效果组件', icon: 'app_00', url: 'http://snow.coolfishstudio.com', desc: '基于canvas绘制的下雪效果的组件，通过引入js，一句js即可实现下雪效果。' }, { name: 'ANIMATE.CSS', title: 'CSS3运动效果库', icon: 'app_01', url: 'http://animate.coolfishstudio.com', desc: '基于CSS3的运动效果库，通过引入css，修改class即可看到效果。' }, { name: '微信摇一摇', title: '微信摇一摇', icon: 'app_02', url: 'http://shake.coolfishstudio.com/', desc: '基于HTML5的运动传感器，模拟摇一摇被触发才执行的事件效果。' }, { name: '小球称重', title: '小球称重', icon: 'app_03', url: 'http://weigh.coolfishstudio.com/', desc: '基于js实现找出用天秤找出异常小球，并指出它是偏轻还是偏重的游戏案例。' }, { name: '捕鱼达人', title: '捕鱼达人', icon: 'app_04', url: 'http://fishing.coolfishstudio.com/', desc: '基于canvas的做的仿制捕鱼达人小游戏DEMO。' }, { name: '卡通飞行', title: '打飞机', icon: 'app_05', url: 'http://flight.coolfishstudio.com/', desc: '使用Egret游戏引擎做的一个打飞机游戏，这是我学习egret所写的第一个小游戏。' }];
    res.renderPage('labs', { applications: applications });
});
// 关于
router.get('/about', function (req, res) {
    res.renderPage('about');
});

// 留言
router.use('/message', _router4.default);
/* 后台管理 */
router.get('/admin/login', _auth2.default.auth2Home, _router6.default.viewAdminLogin);
router.use('/admin/auth', _router6.default);
router.use('/admin', _router2.default);

exports.default = router;