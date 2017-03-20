'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var AppSchema = new Schema({
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    cover: { type: String, default: '' },
    url: { type: String, default: '' },
    desc: { type: String, default: '' },
    type: { type: Number, default: 0 },
    isTop: { type: Boolean, default: false },
    hits: { type: Number, default: 0 },
    ms: { type: Number, default: 0 },
    removed: { type: Boolean, default: false },
    createdByID: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'app'
});

exports.default = _db2.default.model('App', AppSchema);