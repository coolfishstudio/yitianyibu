'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../middleware/db');

var Schema = _db.mongoose.Schema;

var MessageSchema = new Schema({
  ip: { type: String, required: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  content: { type: String, required: true },
  removed: { type: Boolean, default: false }
}, {
  collection: 'message',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

exports.default = _db.mongoose.model('Message', MessageSchema);
//# sourceMappingURL=model.js.map