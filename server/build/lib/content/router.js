'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _auth = require('../../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/', _controller2.default.findAll);
router.get('/by/category/:id', _controller2.default.findAllByCategory);
router.get('/new-post', _controller2.default.getNewContent);
router.get('/random-post', _controller2.default.getRandomContent);
router.get('/:id([0-9a-f]{24})', _controller2.default.getById);
router.post('/', (0, _auth2.default)().authenticate(), _controller2.default.insert);
router.put('/', (0, _auth2.default)().authenticate(), _controller2.default.update);

exports.default = router;
//# sourceMappingURL=router.js.map