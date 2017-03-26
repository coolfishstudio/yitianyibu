'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var CommentSchema = new Schema({
    ip: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, default: '' },
    content: { type: String, required: true },
    contentId: { type: String, default: null },
    removed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'comment'
});

exports.default = _db2.default.model('Comment', CommentSchema);