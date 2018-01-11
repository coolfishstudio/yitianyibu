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

router.post('/', _controller2.default.insert);
router.get('/', _controller2.default.findAll);
router.delete('/:id([0-9a-f]{24})', (0, _auth2.default)().authenticate(), _controller2.default.removeById);

exports.default = router;
//# sourceMappingURL=router.js.map