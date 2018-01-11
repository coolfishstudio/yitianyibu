'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _config = require('./config');

var _auth = require('./middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use((0, _auth2.default)().initialize());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.all('/*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', req.headers && req.headers.origin ? req.headers.origin : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
(0, _router2.default)(app);

app.listen(_config.PORT, function () {
  console.log('\u670D\u52A1\u5668\u5DF2\u542F\u52A8 \u7AEF\u53E3\u53F7 [' + _config.PORT + ']');
});
//# sourceMappingURL=app.js.map