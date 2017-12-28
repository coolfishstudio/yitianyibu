'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../middleware/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var CommentSchema = new Schema({
  ip: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  content: { type: String, required: true },
  commentById: { type: Schema.Types.ObjectId, required: true },
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
  collection: 'comment'
});

exports.default = _db2.default.model('Comment', CommentSchema);
//# sourceMappingURL=model.js.map