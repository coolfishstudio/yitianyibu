'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('../auth/controller');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('../app/controller');

var _controller4 = _interopRequireDefault(_controller3);

var _controller5 = require('../category/controller');

var _controller6 = _interopRequireDefault(_controller5);

var _controller7 = require('../comment/controller');

var _controller8 = _interopRequireDefault(_controller7);

var _controller9 = require('../content/controller');

var _controller10 = _interopRequireDefault(_controller9);

var _controller11 = require('../message/controller');

var _controller12 = _interopRequireDefault(_controller11);

var _controller13 = require('../setting/controller');

var _controller14 = _interopRequireDefault(_controller13);

var _controller15 = require('../stat/controller');

var _controller16 = _interopRequireDefault(_controller15);

var _controller17 = require('../tag/controller');

var _controller18 = _interopRequireDefault(_controller17);

var _controller19 = require('./controller');

var _controller20 = _interopRequireDefault(_controller19);

var _auth = require('../../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/login', _auth2.default.auth2Home, _controller2.default.viewAdminLogin);

router.get('/comment', _auth2.default.notAuth2Login, _controller8.default.viewAdminPage);
router.get('/stat', _auth2.default.notAuth2Login, _controller16.default.viewAdminPage);
/* content */
router.get('/content', _auth2.default.notAuth2Login, _controller10.default.viewAdminContent);
router.get('/content/create', _auth2.default.notAuth2Login, _controller10.default.viewAdminCreateContent);
router.post('/upload', _auth2.default.notAuth2Login, _controller10.default.uploadImage);
router.post('/content/create', _auth2.default.notAuth2Login, _controller10.default.createContent);
router.get('/content/:contentId/update', _auth2.default.notAuth2Login, _controller10.default.viewAdminUpdateContent);
router.post('/content/:contentId/update', _auth2.default.notAuth2Login, _controller10.default.updateContent);
router.get('/content/:contentId/remove', _auth2.default.notAuth2Login, _controller10.default.viewAdminRemoveContent);
router.post('/content/:contentId/remove', _auth2.default.notAuth2Login, _controller10.default.removeContent);
/* app */
router.get('/app', _auth2.default.notAuth2Login, _controller4.default.viewAdminApp);
router.get('/app/create', _auth2.default.notAuth2Login, _controller4.default.viewAdminCreateApp);
router.post('/app/create', _auth2.default.notAuth2Login, _controller4.default.createApp);
router.get('/app/:appId/top', _auth2.default.notAuth2Login, _controller4.default.topApp);
router.get('/app/:appId/untop', _auth2.default.notAuth2Login, _controller4.default.untopApp);
router.get('/app/:appId/update', _auth2.default.notAuth2Login, _controller4.default.viewAdminUpdateApp);
router.post('/app/:appId/update', _auth2.default.notAuth2Login, _controller4.default.updateApp);
router.get('/app/:appId/remove', _auth2.default.notAuth2Login, _controller4.default.viewAdminRemoveApp);
router.post('/app/:appId/remove', _auth2.default.notAuth2Login, _controller4.default.removeApp);
/* category */
router.get('/category', _auth2.default.notAuth2Login, _controller6.default.viewAdminCategory);
router.get('/category/create', _auth2.default.notAuth2Login, _controller6.default.viewAdminCreateCategory);
router.post('/category/create', _auth2.default.notAuth2Login, _controller6.default.createCategory);
router.get('/category/:categoryId/update', _auth2.default.notAuth2Login, _controller6.default.viewAdminUpdateCategory);
router.post('/category/:categoryId/update', _auth2.default.notAuth2Login, _controller6.default.updateCategory);
router.get('/category/:categoryId/remove', _auth2.default.notAuth2Login, _controller6.default.viewAdminRemoveCategory);
router.post('/category/:categoryId/remove', _auth2.default.notAuth2Login, _controller6.default.removeCategory);
/* tag */
router.get('/tag', _auth2.default.notAuth2Login, _controller18.default.viewAdminTag);
router.get('/tag/create', _auth2.default.notAuth2Login, _controller18.default.viewAdminCreateTag);
router.post('/tag/create', _auth2.default.notAuth2Login, _controller18.default.createTag);
router.get('/tag/:tagId/update', _auth2.default.notAuth2Login, _controller18.default.viewAdminUpdateTag);
router.post('/tag/:tagId/update', _auth2.default.notAuth2Login, _controller18.default.updateTag);
router.get('/tag/:tagId/remove', _auth2.default.notAuth2Login, _controller18.default.viewAdminRemoveTag);
router.post('/tag/:tagId/remove', _auth2.default.notAuth2Login, _controller18.default.removeTag);
/* setting */
router.get('/setting', _auth2.default.notAuth2Login, _controller14.default.viewAdminSetting);
router.get('/setting/update', _auth2.default.notAuth2Login, _controller14.default.viewAdminUpdateSetting);
router.post('/setting/update', _auth2.default.notAuth2Login, _controller14.default.updateSetting);
router.get('/setting/create', _auth2.default.notAuth2Login, _controller14.default.createSetting);
/* message */
router.get('/message', _auth2.default.notAuth2Login, _controller12.default.viewAdminPage);
router.get('/message/:messageId/remove', _auth2.default.notAuth2Login, _controller12.default.viewAdminRemoveMessage);
router.post('/message/:messageId/remove', _auth2.default.notAuth2Login, _controller12.default.removeMessage);

router.get('/', _auth2.default.notAuth2Login, _controller20.default.viewAdminPage);

exports.default = router;