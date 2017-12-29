'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../middleware/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var MessageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdByID: { type: Schema.Types.ObjectId, required: true },
  removed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
}, {
  collection: 'message'
});

exports.default = _db2.default.model('Message', MessageSchema);
//# sourceMappingURL=model.js.map