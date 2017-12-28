'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../middleware/db');

var Schema = _db.mongoose.Schema;

var AppSchema = new Schema({
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    pathname: { type: String, default: '' }, // 自定义链接
    logo: { type: String, default: '' },
    cover: { type: String, default: '' },
    url: { type: String, default: '' },
    desc: { type: String, default: '' },
    type: { type: Number, default: 0 },
    hits: { type: Number, default: 0 },
    removed: { type: Boolean, default: false },
    createdById: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'app'
});

exports.default = _db.mongoose.model('App', AppSchema);
//# sourceMappingURL=model.js.map