'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('../app/controller');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('../category/controller');

var _controller4 = _interopRequireDefault(_controller3);

var _controller5 = require('../comment/controller');

var _controller6 = _interopRequireDefault(_controller5);

var _controller7 = require('../content/controller');

var _controller8 = _interopRequireDefault(_controller7);

var _controller9 = require('../message/controller');

var _controller10 = _interopRequireDefault(_controller9);

var _controller11 = require('../setting/controller');

var _controller12 = _interopRequireDefault(_controller11);

var _controller13 = require('../stat/controller');

var _controller14 = _interopRequireDefault(_controller13);

var _controller15 = require('../tag/controller');

var _controller16 = _interopRequireDefault(_controller15);

var _controller17 = require('./controller');

var _controller18 = _interopRequireDefault(_controller17);

var _auth = require('../../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/app', _auth2.default.notAuth2Login, _controller2.default.viewAdminPage);
router.get('/category', _auth2.default.notAuth2Login, _controller4.default.viewAdminPage);
router.get('/comment', _auth2.default.notAuth2Login, _controller6.default.viewAdminPage);
router.get('/content', _auth2.default.notAuth2Login, _controller8.default.viewAdminPage);
router.get('/message', _auth2.default.notAuth2Login, _controller10.default.viewAdminPage);
router.get('/setting', _auth2.default.notAuth2Login, _controller12.default.viewAdminPage);
router.get('/stat', _auth2.default.notAuth2Login, _controller14.default.viewAdminPage);
router.get('/tag', _auth2.default.notAuth2Login, _controller16.default.viewAdminPage);
router.get('/', _auth2.default.notAuth2Login, _controller18.default.viewAdminPage);

exports.default = router;