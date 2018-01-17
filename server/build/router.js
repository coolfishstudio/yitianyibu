'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('./lib/user/router');

var _router2 = _interopRequireDefault(_router);

var _router3 = require('./lib/content/router');

var _router4 = _interopRequireDefault(_router3);

var _router5 = require('./lib/category/router');

var _router6 = _interopRequireDefault(_router5);

var _router7 = require('./lib/tag/router');

var _router8 = _interopRequireDefault(_router7);

var _router9 = require('./lib/app/router');

var _router10 = _interopRequireDefault(_router9);

var _router11 = require('./lib/notice/router');

var _router12 = _interopRequireDefault(_router11);

var _router13 = require('./lib/message/router');

var _router14 = _interopRequireDefault(_router13);

var _router15 = require('./lib/comment/router');

var _router16 = _interopRequireDefault(_router15);

var _router17 = require('./lib/stat/router');

var _router18 = _interopRequireDefault(_router17);

var _router19 = require('./lib/log/router');

var _router20 = _interopRequireDefault(_router19);

var _router21 = require('./lib/file/router');

var _router22 = _interopRequireDefault(_router21);

var _error = require('./middleware/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = function router(app) {
  app.get('/ping', function (req, res) {
    res.send('ok');
  });
  // file
  app.get('/i/:id([0-9a-f]{24})', function (req, res) {
    res.redirect('/api/file/' + req.params.id);
  });
  // api
  app.use('/api/user', _router2.default);
  app.use('/api/content', _router4.default);
  app.use('/api/category', _router6.default);
  app.use('/api/tag', _router8.default);
  app.use('/api/app', _router10.default);
  app.use('/api/notice', _router12.default);
  app.use('/api/message', _router14.default);
  app.use('/api/comment', _router16.default);
  app.use('/api/stat', _router18.default);
  app.use('/api/log', _router20.default);
  app.use('/api/file', _router22.default);
  app.use('/api/wechat', _router22.default);
  // error
  app.use(_error.handler404);
  app.use(_error.handlerError);
};

exports.default = router;
//# sourceMappingURL=router.js.map