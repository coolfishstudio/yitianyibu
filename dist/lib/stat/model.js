'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../util/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _db2.default.Schema;

var StatSchema = new Schema({
    ip: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'stat'
});

exports.default = _db2.default.model('Stat', StatSchema);