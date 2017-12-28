'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var router = new _express.Router();

router.get('/', function (req, res) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
});
router.get('/:id', function (req, res) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
});
router.post('/', function (req, res) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
});
router.put('/:id', function (req, res) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
});
router.get('/:id', function (req, res) {
  res.json({ 'status': { 'code': 0, 'message': 'success' }, 'data': {} });
});

exports.default = router;
//# sourceMappingURL=router.js.map