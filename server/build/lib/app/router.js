'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

// router.post('/', appController.insert)
router.get('/', _controller2.default.findAll);
router.get('/:id([0-9a-f]{24})/record', _controller2.default.recordById);
// router.get('/:id([0-9a-f]{24})', appController.getById)
// router.put('/:id([0-9a-f]{24})', appController.updateById)
// router.delete('/:id([0-9a-f]{24})', appController.removeById)

exports.default = router;
//# sourceMappingURL=router.js.map