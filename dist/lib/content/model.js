'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var ContentSchema = new Schema({
    title: { type: String, default: '' },
    html: { type: String, default: '' },
    markdown: { type: String, default: '' },
    images: { type: Array, default: null },
    tag: { type: Array, default: null },
    category: { type: String, default: null },
    status: { type: String, default: 'published' },
    featured: { type: Boolean, default: false },
    hits: { type: Number, default: 1 },
    isTop: { type: Number, default: 0 },
    removed: { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'content'
});

exports.default = _db2.default.model('Content', ContentSchema);