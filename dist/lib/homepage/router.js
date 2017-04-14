'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('../post/controller');

var _controller4 = _interopRequireDefault(_controller3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/unfinished', _controller2.default.viewUnfinishedPage);
router.get('/search', _controller4.default.searchKeywords);

exports.default = router;