'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.get('/', _controller2.default.findAll);
router.get('/by/category/:id', _controller2.default.findAllByCategory);
// router.get('/:id', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })
// router.post('/', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })
// router.put('/:id', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })
// router.get('/:id', (req, res) => {
//   res.json({'status':{'code':0,'message':'success'},'data':{}})
// })

exports.default = router;
//# sourceMappingURL=router.js.map