'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var TagSchema = new Schema({
    name: { type: String, required: true },
    weight: { type: Number, default: 0 },
    removed: { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
}, {
    collection: 'tag'
});

exports.default = _db2.default.model('Tag', TagSchema);