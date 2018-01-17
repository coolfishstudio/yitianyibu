'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../middleware/db');

var Schema = _db.mongoose.Schema;

var TagSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, default: 0 },
  removed: { type: Boolean, default: false },
  createdByID: { type: Schema.Types.ObjectId, required: true }
}, {
  collection: 'tag',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

exports.default = _db.mongoose.model('Tag', TagSchema);
//# sourceMappingURL=model.js.map