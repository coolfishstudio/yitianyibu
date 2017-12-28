'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../middleware/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true }, // 名称
  pathname: { type: String, default: '' }, // 自定义链接
  introduce: { type: String, default: '' }, // 介绍
  desc: { type: String, default: '' }, // 描述
  coverUrl: { type: String, default: null }, // 封面图片id
  weight: { type: Number, default: 0 }, // 权重
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
  collection: 'category'
});

exports.default = _db2.default.model('Category', CategorySchema);
//# sourceMappingURL=model.js.map