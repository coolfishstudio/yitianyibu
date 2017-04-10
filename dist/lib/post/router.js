'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('../comment/controller');

var _controller4 = _interopRequireDefault(_controller3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/', _controller2.default.viewListPage);
router.get('/:pid', _controller2.default.viewPostPage);
router.post('/:pid/comment', _controller4.default.createComment);
router.get('/:pid/share', _controller2.default.viewPostSharePage);
router.get('/:pid/qr', _controller2.default.getQrImage);

exports.default = router;