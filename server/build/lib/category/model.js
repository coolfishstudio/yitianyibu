'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../middleware/db');

var Schema = _db.mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true }, // 名称
  pathname: { type: String, default: '' }, // 自定义链接
  desc: { type: String, default: '' }, // 描述
  cover: { type: String, default: null }, // 封面图片id
  weight: { type: Number, default: 0 }, // 权重
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true }
}, {
  collection: 'category',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

exports.default = _db.mongoose.model('Category', CategorySchema);
//# sourceMappingURL=model.js.map